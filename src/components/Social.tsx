import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Social = () => {
    const socialLinks = [
        {
            href: "https://github.com/Homiez09",
            icon: "bi:github",
            label: "GitHub",
            hoverColor: "hover:text-gray-800 hover:bg-gray-100"
        },
        {
            href: "https://www.instagram.com/prpswa_/",
            icon: "bi:instagram",
            label: "Instagram", 
            hoverColor: "hover:text-pink-600 hover:bg-pink-50"
        },
        {
            href: "https://www.facebook.com/phumrapee.soenvanichakul.3/",
            icon: "bi:facebook",
            label: "Facebook",
            hoverColor: "hover:text-blue-600 hover:bg-blue-50"
        }
    ];

    return (
        <div className="flex justify-center mt-5">
            <div className="flex items-center gap-2 p-2">
                {socialLinks.map((social, index) => (
                    <Link 
                        key={index}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`
                            group relative p-3 rounded-xl transition-all duration-100
                            text-gray-600 ${social.hoverColor}
                        `}
                        aria-label={social.label}
                    >
                        <Icon 
                            ssr 
                            icon={social.icon} 
                            width="24" 
                            height="24"
                            className="transition-transform duration-300 group-hover:scale-110" 
                        />
                        
                        {/* Tooltip */}
                        <div className="
                            absolute -top-12 left-1/2 transform -translate-x-1/2 
                            px-3 py-1 bg-gray-800 text-white text-sm rounded-lg
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            pointer-events-none whitespace-nowrap
                            before:content-[''] before:absolute before:top-full before:left-1/2 
                            before:transform before:-translate-x-1/2 before:border-4 
                            before:border-transparent before:border-t-gray-800
                        ">
                            {social.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}