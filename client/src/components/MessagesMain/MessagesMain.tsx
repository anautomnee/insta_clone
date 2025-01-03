import { useOutletContext} from "react-router";
import {CondensedUser, Message} from "../../store/types/instanceTypes.ts";
import {UserState} from "../../store/types/userTypes.ts";

type OutletContextType = {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    user: UserState;
    receiver: CondensedUser;
};

export const MessagesMain = () => {
    const { messages, setMessages, user, receiver } = useOutletContext<OutletContextType>();
    if (!user) return <p>Loading...</p>;
    return (<div className="w-full">
        <div className="flex items-center gap-3 border-b border-b-gray p-4 w-full">
            <img src={receiver?.profile_image} alt={receiver?.username} className="w-11 h-11 object-cover" />
            <p className="font-semibold">{receiver?.username}</p>
        </div>
        <div className="flex flex-col items-center pt-16">
            <img src={receiver?.profile_image} alt={receiver?.username} className="w-24 h-24 object-cover mb-4"/>
            <p className="font-semibold text-xl mb-4">{receiver?.username}</p>
            <button className="bg-gray text-sm py-2 w-[173px] rounded-lg">View profile</button>
        </div>
        <div className="px-3.5">
            {messages?.map((message, index) => (
                <div key={index}>
                    {message.author.username === user?.username ? (<div
                        className="flex gap-4 mb-2 bg-purple w-[397px] rounded-2xl">
                        <img src={user?.profile_image} alt={user?.username}
                            className="w-7 h-7 object-cover" />
                        <p className="font-semibold">{user?.username}</p>
                        <p>{message.content}</p>
                    </div>) : (<div className="flex gap-4 mb-2 bg-gray w-[397px] rounded-2xl">
                        <img src={message.author.profile_image} alt={user?.username}
                             className="w-7 h-7 object-cover"/>
                        <p className="font-semibold">{message.author.username}</p>
                        <p>{message.content}</p>
                    </div>)}
                </div>
            ))}
        </div>
    </div>);
};