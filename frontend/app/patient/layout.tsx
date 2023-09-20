"use client"
import Navbar from "@/components/nomo-navbar";
import StartConsultationNavbar from "@/components/startConsultationNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100vh] bg-slate-400">
            <Navbar />
            {children}
        </div>
    );
}
