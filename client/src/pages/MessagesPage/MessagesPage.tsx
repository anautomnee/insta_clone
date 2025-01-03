import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import {useEffect, useState} from "react";
import {CondensedUser, Message} from "../../store/types/instanceTypes.ts";
import {fetchChatMessages} from "../../uitls/apiCalls.ts";
import {Outlet, useParams} from "react-router";
import {UserState} from "../../store/types/userTypes.ts";

export const MessagesPage = () => {
    const redirected: boolean = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiver, setReceiver] = useState<CondensedUser | null>(null);
    const user: UserState = useSelector((state: RootState) => state.user);
    const token: string | null = localStorage.getItem("userToken");
    const {username} = useParams();

    useEffect((): void => {
        const getMessages = async () => {
            if (!token || !username) return;
            const result = await fetchChatMessages(username, token);
            setMessages(result.messages);
            if (result.user1.username === username) {
                setReceiver(result.user1);
            } else {
                setReceiver(result.user2);
            }
        };
        if (messages?.length === 0 || !receiver) {
            getMessages();
        }
    }, [messages]);

    return (<div className="flex h-full">
        <div className="w-[398px] border-r border-r-gray">
            <p className="font-semibold ml-6 mt-9 mb-14">{user?.username}</p>
        </div>
        <Outlet context={{ messages, setMessages, user, receiver }} />
    </div>);
}