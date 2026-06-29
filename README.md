# 🏥 MediCare - Enterprise Medical Portal (Frontend)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-6772E5?style=for-the-badge&logo=stripe&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

A highly scalable, visually stunning, and secure Full-Stack Medical Patient-Doctor Portal built with Next.js App Router. This application features strict Enterprise-Grade Role-Based Access Control (RBAC), secure payment gateways, and real-time appointment scheduling.

🔗 **[Live Frontend Demo](https://medi-care-connec-sii-a10-front-end.vercel.app)** | 🔗 **[Live Backend API](https://medi-care-connec-sii-a10-back-end.vercel.app)**

## ✨ Key Features & Functionalities

*   **🛡️ Edge-Compatible RBAC Middleware:** Cryptographically secured route isolation using `jose`. Patients cannot access Doctor portals, and Doctors cannot access Admin panels.
*   **🩺 Dynamic Role-Based UI:** The Navbar and UI strictly render options based on the authenticated user's role (Patient, Doctor, Admin).
*   **📅 Conflict-Free Appointment Booking:** Real-time scheduling interface that communicates with the backend to prevent infinite overbooking.
*   **💳 Secure Stripe Integration:** Encrypted checkout flow. Pricing is strictly authorized by the server to prevent client-side price manipulation.
*   **⭐ Interactive Review Modal:** A custom, fully responsive Tailwind CSS modal for patients to rate and review their completed appointments.
*   **📱 100% Mobile Responsive:** Fluid grids, adaptive modals, and intelligent layouts that look perfect on any device.

## 🛠️ Tech Stack & Libraries

| Category          | Technology / Library |
| ----------------- | -------------------- |
| **Framework**     | Next.js (App Router) |
| **Styling**       | Tailwind CSS         |
| **Authentication**| JWT (jose edge-compatible) |
| **Payment**       | Stripe Elements      |
| **State/Fetch**   | React Hooks, Fetch API |
| **Icons**         | React Icons / Lucide |

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and configure the following:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The live URL of the deployed Express backend. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe Public Key for client-side elements. |
| `JWT_SECRET` | Must match the backend secret for Edge middleware decoding. |

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-frontend-repo-url>
   cd frontend
