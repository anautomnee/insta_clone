import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import {Link, Outlet, useParams} from "react-router";
import {UserState} from "../../store/types/userTypes.ts";
import {useEffect, useState} from "react";
import {fetchUserChats} from "../../uitls/apiCalls.ts";
import {Chat} from "../../store/types/instanceTypes.ts";
import {formatDate} from "../../uitls/utils.ts";

export const MessagesPage = () => {
    const redirected: boolean = useRedirectIfNotAuthenticated();
    const [chats, setChats] = useState<Chat[]>([]);
    const user: UserState = useSelector((state: RootState) => state.user);
    const { username } = useParams();

    useEffect(() => {
        const getChats = async() => {
            const result = await fetchUserChats();
            if (!result) return;
            setChats(result);
        }
        if (chats.length === 0) getChats();
    }, []);

    if (redirected) return null;

    return (
        <div className="flex h-full">
            <div className={`${
                username ? "hidden" : "flex"
            } sm:flex lg:min-w-[398px] md:min-w-64 min-w-full md:border-r border-r-gray flex-col`}>
                <p className="font-semibold ml-4 lg:ml-6 mt-9 mb-14 text-xl">{user?.username}</p>
                <div className="flex flex-col">
                    {chats?.length > 0 && chats.map((chat: Chat) => {
                        const chatUsername =
                            chat?.user1?.username === user?.username ? chat?.user2.username : chat.user1.username;

                        // Add gray background class if this chat is selected
                        const isActive = username === chatUsername;

                        return (
                            <Link
                                to={`/messages/${chatUsername}`}
                                key={chat._id}
                                className={`flex gap-3 py-2 px-4 lg:px-6 ${
                                    isActive ? "bg-gray" : ""
                                } hover:bg-lightgray`}
                            >
                                <img
                                    src={
                                        chat?.user1?.username === user?.username
                                            ? chat.user2.profile_image
                                            : chat.user1.profile_image
                                    }
                                    alt="profile_image"
                                    className="rounded-[50%] object-cover lg:w-14 lg:h-14
                                    w-8 h-8"
                                />
                                <div className="flex flex-col gap-1.5">
                                    <p className="text-sm">{chatUsername}</p>
                                    <p className="text-xs text-darkgray">
                                        {chat?.last_message?.author?.username === user?.username ? "You" : chat?.last_message?.author?.username}{" "}
                                        sent a message. · {formatDate(new Date(chat?.last_message?.createdAt))}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className={`${username ? "flex" : "hidden"} sm:flex flex-1`}>
                <Outlet context={{user}}/>
            </div>
        </div>
    );
}