import logo from "../../assets/logo.svg";
import close from "../../assets/nav_icons/close.svg";
import links from "./navLinks.ts";
import {Link} from "react-router";
import {MouseEventHandler, useState} from "react";

interface Props {
    style: string,
    type: string,
    closeMenu?: MouseEventHandler<HTMLImageElement>;
}

export const NavBar = ({style, type, closeMenu}: Props) => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    return (
        <div className={`flex flex-col gap-4 bg-white border-r border-gray py-[28px] ${style}`}>
            <div className="flex justify-between">
                <img className="w-24" src={logo} alt="Ichgram"/>
                {type === 'Mobile' && <img src={close} alt="Close menu" onClick={closeMenu} />}
            </div>
            <div className="flex flex-col gap-4 mt-6">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.href}
                    >
                        <div className="flex gap-4"
                             onMouseOver={() => setHoveredLink(link.name)}
                             onMouseLeave={() => setHoveredLink(null)}>
                            <img
                                src={hoveredLink === link.name ? link.logoFill : link.logo}
                                alt={link.name}
                            />
                            {link.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}