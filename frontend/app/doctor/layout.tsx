"use client"
// import InstitutionNavbar from "@/components/navbar";
import Navbar from "@/components/nomo-navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100vh] bg-slate-400">
            <Navbar />
            {children}
        </div>
    );
}
