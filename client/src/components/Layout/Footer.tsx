import links from "./navLinks.ts";
import {Link} from "react-router";

export const Footer = () => {
    return (
        <footer className="flex flex-col gap-12 justify-center items-center w-[500px] mx-auto mb-16 h-fit">
            <div className="flex gap-10 mt-6">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.href}
                        className="text-darkgray text-sm"
                    >{link.name}</Link>
                ))}
            </div>
            <p className="text-darkgray text-sm">© 2024 ICHgram</p>
        </footer>
    );
};