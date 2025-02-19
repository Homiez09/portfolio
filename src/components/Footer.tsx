import Link from "next/link";
import packageJson from "../../package.json"

export default function Footer() {
    return (
        <footer className="flex flex-row items-center justify-center w-full h-12 border-t mt-14 text-sm">
            <Link href="https://github.com/Homiez09">© 2024 | Made with <span className="text-red-500">♥</span> by <strong>Homiez09</strong> <span className="font-bold text-[#0070f3]">v2.11.0</span></Link>
            
        </footer>
    )
}