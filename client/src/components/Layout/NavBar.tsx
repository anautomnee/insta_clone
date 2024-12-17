import logo from "../../assets/logo.svg";
import close from "../../assets/nav_icons/close.svg";
import links from "./navLinks.ts";
import {Link} from "react-router";
import {MouseEventHandler, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {CreatePost} from "../CreatePost/CreatePost.tsx";

interface Props {
    style: string,
    type: string,
    closeMenu?: MouseEventHandler<HTMLImageElement>;
}

export const NavBar = ({style, type, closeMenu}: Props) => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const {userInfo} = useSelector((state:RootState) => state.auth);
    const createPostRef = useRef<HTMLDivElement>(null);
    const {userToken} = useSelector((state:RootState) => state.auth);

    const showCreatePost = () => {
        if(createPostRef.current) {
            createPostRef.current.hidden = false;
        }
    };

    return (
        <div className={`flex flex-col gap-4 bg-white border-r border-gray py-[28px] ${style}`}>
            <div className="flex justify-between">
                <img className="w-24" src={logo} alt="Ichgram"/>
                {type === 'Mobile' && <img src={close} alt="Close menu" onClick={closeMenu} />}
            </div>
            <div className="flex flex-col gap-4 mt-6">
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
                        {links[0].name}
                    </div>
                </Link>
                <div className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[1].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[1].name ? links[1].logoFill : links[1].logo}
                        alt={links[1].name}
                    />
                    Search
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
                        {links[2].name}
                    </div>
                </Link>
                <div className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[3].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[3].name ? links[3].logoFill : links[3].logo}
                        alt={links[3].name}
                    />
                    Messages
                </div>
                <div className="flex gap-4 cursor-pointer"
                     onMouseOver={() => setHoveredLink(links[4].name)}
                     onMouseLeave={() => setHoveredLink(null)}>
                    <img
                        src={hoveredLink === links[4].name ? links[4].logoFill : links[4].logo}
                        alt={links[4].name}
                    />
                    Notifications
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
                    <p className="cursor-pointer">Create</p>
                    <div ref={createPostRef} hidden>
                        <CreatePost userInfo={userInfo} divRef={createPostRef} token={userToken} />
                    </div>
                </div>
                <Link
                    to={`profile/${userInfo?.id}`}
                >
                    <div className="flex items-center gap-4 mt-12">
                        <img
                            src={userInfo?.profile_image}
                            alt="Profile image"
                            className="w-6 h-6 rounded-[50%] border border-gray"
                        />
                        <p className="font-semibold">Profile</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}