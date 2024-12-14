import links from "./navLinks.ts";
import logo from "../../assets/logo.svg"
import menu from "../../assets/nav_icons/menu.svg"
import {Link} from "react-router";
import {useState} from "react";
import {useScreenWidth} from "../../uitls/customHooks.ts";

export const Navigation = () => {
    const screenWidth = useScreenWidth();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    // }

    if (screenWidth < 768) {
        return (<div className="border-r border-gray p-3 ">
            <img src={menu} alt="Menu"/>
        </div>);
    }

    return (
        <div className="flex flex-col gap-4 border-r border-gray py-[28px] px-6 w-[244px]">
            <img className="w-24" src={logo} alt="Ichgram"/>
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
    );
};