export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100vh] bg-slate-400">
            {children}
        </div>
    );
}
