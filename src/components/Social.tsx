import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import 'iconify-icon';

export const Social = () => {
    const iconStyle = {
        height: "25",
        width: "25",
        style: {
            color: "#161616"
        }
    }
    return (
        <>
            <div className="mt-5 flex flex-row max-lg:justify-center items-center h-10 gap-4">
                <Link href="https://github.com/Homiez09" target="_blank"><Icon ssr icon="bi:github" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></Link>
                <Link href="https://www.instagram.com/prpswa_/" target="_blank"><Icon ssr icon="bi:instagram" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></Link>
                <Link href="https://www.facebook.com/phumrapee.soenvanichakul.3/" target="_blank"><Icon ssr icon="bi:facebook" width={iconStyle.width} height={iconStyle.height} style={iconStyle.style} /></Link>
            </div>
        </>
    );
}