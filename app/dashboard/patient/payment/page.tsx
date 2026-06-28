"use client";

import { useEffect, useState, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentContent() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const appointmentId = searchParams?.get("appointmentId");
  const amount = searchParams?.get("amount");

  useEffect(() => {
    if (!appointmentId || !amount) {
      toast.error("Invalid payment link.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://medi-care-connec-sii-a10-back-end.vercel.app'}/api/payments/create-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ appointmentId, amount: Number(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClientSecret(data.clientSecret);
        } else {
          toast.error(data.message || "Failed to initialize payment");
        }
      })
      .catch(() => toast.error("Network error while starting payment"));
  }, [appointmentId, amount]);

  const appearance = {
    theme: 'night' as 'night',
    variables: {
      colorPrimary: '#0ea5e9',
    },
  };

  return (
    <div className="glass p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full relative z-10 text-center">
      <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-slate-100 font-bold tracking-tight mb-2">Secure Checkout</h2>
      <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mb-8">
        Complete your payment of <span className="font-bold text-primary">${amount}</span> for the appointment.
      </p>

      {clientSecret ? (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} appointmentId={appointmentId!} />
        </Elements>
      ) : (
        <div className="py-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-on-surface-variant dark:text-slate-400">Initializing payment gateway...</p>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-slate-950 p-4 md:p-8 lg:p-12 relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/20 dark:bg-primary-fixed-dim/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob"></div>
      </div>
      <Suspense fallback={<div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}
