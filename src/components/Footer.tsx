import packageJson from "../../package.json"

export default function Footer() {
    return (
        <footer className="flex flex-row items-center justify-center w-full h-16 mt-10 border-t border-gray-100 text-sm text-gray-400">
            <span>© {new Date().getFullYear()} Portfolio | v{packageJson.version}</span>
        </footer>
    )
}