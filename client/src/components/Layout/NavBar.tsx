import logo from "../../assets/logo.svg";
//import close from "../../assets/nav_icons/close.svg";
import ich from "../../assets/nav_icons/ich.png"
import links from "./navLinks.ts";
import {Link} from "react-router";
import { useRef, useState} from "react";
//import {MouseEventHandler} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {CreatePost} from "../CreatePost/CreatePost.tsx";

interface Props {
    style: string,
}

export const NavBar = ({style}: Props) => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const {id, profileImage} = useSelector((state:RootState) => state.user);
    const createPostRef = useRef<HTMLDivElement>(null);
    const userToken = localStorage.getItem("userToken");

    const showCreatePost = () => {
        if(createPostRef.current) {
            createPostRef.current.hidden = false;
        }
    };

    return (
        <div className={`flex md:flex-col items-center gap-4 bg-white 
        md:border-r border-t md:border-t-0  border-gray py-[28px] ${style}`}>
            <div className="hidden md:flex">
                <img src={logo}
                     alt="logo"
                     className="hidden lgg:block"/>
                <img src={ich}
                     alt="logo small"
                     className="block lgg:hidden"/>
            </div>
            <div className="flex md:flex-col items-center justify-around md:items-start gap-4 md:mt-6 w-full">
                <Link
                    to={links[0].href}
                >
                    <div className="flex gap-4"
                         onMouseOver={() => setHoveredLink(links[0].name)}
                         onMouseLeave={() => setHoveredLink(null)}>
                        <img
                            src={hoveredLink === links[0].name ? links[0].logoFill : links[0].logo}
                            alt={links[0].name}
                        />
                        <span className="hidden lgg:block">{links[0].name}</span>
                    </div>
                </Link>
                <div className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[1].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[1].name ? links[1].logoFill : links[1].logo}
                        alt={links[1].name}
                    />
                    <span className="hidden lgg:block">Search</span>
                </div>
                <Link
                    to={links[2].href}
                >
                    <div className="flex gap-4 cursor-pointer"
                         onMouseOver={() => setHoveredLink(links[2].name)}
                         onMouseLeave={() => setHoveredLink(null)}>
                        <img
                            src={hoveredLink === links[2].name ? links[2].logoFill : links[2].logo}
                            alt={links[2].name}
                        />
                        <span className="hidden lgg:block">{links[2].name}</span>
                    </div>
                </Link>
                <div className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[3].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[3].name ? links[3].logoFill : links[3].logo}
                        alt={links[3].name}
                    />
                    <span className="hidden lgg:block">Messages</span>
                </div>
                <div className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[4].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[4].name ? links[4].logoFill : links[4].logo}
                        alt={links[4].name}
                    />
                    <span className="hidden lgg:block">Notifications</span>
                </div>
                <div className="flex gap-4"
                     onClick={showCreatePost}
                     onMouseOver={() => setHoveredLink(links[5].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[5].name ? links[5].logoFill : links[5].logo}
                        alt={links[5].name}
                        className="cursor-pointer"
                    />
                    <span className="cursor-pointer hidden lgg:block">Create</span>
                    <div ref={createPostRef} hidden>
                        <CreatePost userId={id} profileImage={profileImage} divRef={createPostRef} token={userToken} />
                    </div>
                </div>
                <Link
                    to={`profile/${id}`}
                >
                    <div className="flex items-center gap-4 md:mt-12">
                        <img
                            src={profileImage}
                            alt="Profile image"
                            className="w-6 h-6 rounded-[50%] border border-gray"
                        />
                        <span className="font-semibold hidden lgg:block">Profile</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}