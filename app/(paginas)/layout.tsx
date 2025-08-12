
export default function GeneralLayout({
    children
}: {
    children : React.ReactNode;
}) {
    return (
        <>
        <main>
            <h1>layout aboutt</h1>
            
            {children}
        </main>
        </>
    );
}