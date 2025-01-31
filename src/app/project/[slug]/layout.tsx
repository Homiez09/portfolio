export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-center'>
            <div className="w-[680px]">
                {children}
            </div>
        </div>
    );
}