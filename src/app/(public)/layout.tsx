import Footer from "@/components/shared/Footer";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </>

    );
}
