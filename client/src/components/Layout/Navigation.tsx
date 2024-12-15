import logo from "../../assets/logo.svg"
import menu from "../../assets/nav_icons/menu.svg";
import {useScreenWidth} from "../../uitls/customHooks.ts";
import {NavBar} from "./NavBar.tsx";
import {MouseEventHandler, useRef} from "react";

export const Navigation = () => {
    const screenWidth = useScreenWidth();
    const menuRef = useRef<HTMLDivElement>(null);

    const openMenu: MouseEventHandler<HTMLImageElement> = () => {
        if (menuRef.current) {
            menuRef.current.hidden = false;
        }
    };

    const closeMenu: MouseEventHandler<HTMLImageElement> = () => {
        if (menuRef.current) {
            menuRef.current.hidden = true;
        }
    };

    if (screenWidth < 768) {
        return (<div className="flex justify-between py-4 p-6">
            <img onClick={openMenu} src={menu} alt="Menu"/>
            <img className="h-8" src={logo} alt="Ichgram"/>
            <div
                ref={menuRef}
                className="absolute z-10 top-0 left-0 h-full"
                hidden>
                <NavBar style='px-6 w-[200px] h-full' type='Mobile' closeMenu={closeMenu}/>

            </div>
        </div>);
    }

    return <NavBar style='px-6 w-[244px]' type='Desktop'/>
};