import logo from "../../assets/logo.svg";
import ich from "../../assets/nav_icons/ich.png"
import links from "./navLinks.ts";
import {Link, useLocation} from "react-router";
import { useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {CreatePost} from "../CreatePost/CreatePost.tsx";
import {useFetchUserAfterReload} from "../../uitls/customHooks.ts";
import {NotificationsModal} from "../NotificationsModal/NotificationsModal.tsx";
import {SearchModal} from "../SearchModal/SearchModal.tsx";

export const Navigation = () => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.user);
    useFetchUserAfterReload(user);
    const createPostRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const userToken = localStorage.getItem("userToken");
    const location = useLocation();

    const showCreatePost = () => {
        if(createPostRef.current) {
            createPostRef.current.hidden = false;
        }
    };

    const showNotifications = () => {
        if(notificationsRef.current) {
            notificationsRef.current.hidden = false;
        }
    };

    const showSearch = () => {
        if(searchRef.current) {
            searchRef.current.hidden = false;
        }
    };

    return (
        <div className="flex md:flex-col items-center gap-4 bg-white
        md:border-r border-t md:border-t-0  border-gray py-[28px] px-4 lgg:px-6 min-w-full md:min-w-[60px] lgg:min-w-[244px]">
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
                            src={hoveredLink === links[0].name || location.pathname === '/' ? links[0].logoFill : links[0].logo}
                            alt={links[0].name}
                        />
                        <span className="hidden lgg:block">{links[0].name}</span>
                    </div>
                </Link>
                <div className="hidden md:flex gap-4 cursor-pointer"
                     onClick={showSearch}
                     onMouseOver={() => setHoveredLink(links[1].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[1].name ? links[1].logoFill : links[1].logo}
                        alt={links[1].name}
                    />
                    <span className="hidden lgg:block">Search</span>
                    <div ref={searchRef} hidden className="z-20">
                        <SearchModal modalRef={searchRef} />
                    </div>
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
                <Link to="/messages" className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[3].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={
                            hoveredLink === links[3].name || location.pathname.startsWith('/messages')
                                ? links[3].logoFill
                                : links[3].logo
                        }
                        alt={links[3].name}
                    />
                    <span className="hidden lgg:block">Messages</span>
                </Link>
                <div className="hidden md:flex gap-4 cursor-pointer"
                     onClick={showNotifications}
                     onMouseOver={() => setHoveredLink(links[4].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[4].name ? links[4].logoFill : links[4].logo}
                        alt={links[4].name}
                    />
                    <span className="hidden lgg:block">Notifications</span>
                    <div ref={notificationsRef} hidden className="z-20">
                        <NotificationsModal modalRef={notificationsRef} notifications={user?.notifications}/>
                    </div>
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
                        <CreatePost userId={user?._id} profileImage={user?.profile_image} divRef={createPostRef} token={userToken} />
                    </div>
                </div>
                <Link
                    to={`profile/${user?.username}`}
                >
                    <div className="flex items-center gap-4 md:mt-12">
                        <img
                            src={user?.profile_image}
                            alt="Profile image"
                            className="w-6 h-6 object-cover rounded-[50%] border border-gray"
                        />
                        <span className="font-semibold hidden lgg:block">Profile</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}