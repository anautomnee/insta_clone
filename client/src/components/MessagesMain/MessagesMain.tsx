import {useOutletContext, useParams} from "react-router";
import {CondensedUser, Message} from "../../store/types/instanceTypes.ts";
import {UserState} from "../../store/types/userTypes.ts";
import {ChangeEvent, KeyboardEventHandler, useEffect, useState} from "react";
import {backendURL, fetchChatMessages} from "../../uitls/apiCalls.ts";
import { io } from "socket.io-client";

const socket = io(backendURL);

type OutletContextType = {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    user: UserState;
    receiver: CondensedUser;
};

export const MessagesMain = () => {
    const { user } = useOutletContext<OutletContextType>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [receiver, setReceiver] = useState<CondensedUser | null>(null);
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

    useEffect(() => {
        // Listen for new messages
        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    // useEffect(() => {
    //     // Check if chatId is available to join the room
    //     const chatId = currentChatId; // Replace with the actual chat ID from your app logic
    //
    //     if (chatId) {
    //         // Join the chat room
    //         socket.emit("joinRoom", chatId);
    //         console.log(`Joined room: ${chatId}`);
    //     }
    //
    //     // Listen for new messages
    //     socket.on("receiveMessage", (message) => {
    //         setMessages((prev) => [...prev, message]);
    //     });
    //
    //     // Cleanup on component unmount or when chatId changes
    //     return () => {
    //         if (chatId) {
    //             socket.emit("leaveRoom", chatId);
    //             console.log(`Left room: ${chatId}`);
    //         }
    //         socket.off("receiveMessage");
    //     };
    // }, [currentChatId]); // Re-run effect if chatId changes


    const sendMessage = (newMessage: string) => {
        if (!receiver) return;
        const messageData: Message = {
            _id: '',
            author: {
                _id: user._id,
                username: user.username,
                profile_image: user.profile_image
            },
            receiver,
            content: newMessage,
        };

        // Emit the message to the server
        socket.emit("sendMessage", {authorId: user._id, receiverId: receiver._id, content: newMessage});

        // Add the message to the local state
        setMessages((prev: Message[]): Message[] => [...prev, messageData]);
        setNewMessage("");
    };

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            sendMessage(newMessage);
        }
    }

    if (!user) return <p>Loading...</p>;

    return (<div className="w-full">
        <div className="flex items-center gap-3 border-b border-b-gray p-4 w-full">
            <img src={receiver?.profile_image} alt={receiver?.username} className="w-11 h-11 object-cover rounded-[50%]" />
            <p className="font-semibold">{receiver?.username}</p>
        </div>
        <div className="flex flex-col items-center mt-16 mb-20">
            <img src={receiver?.profile_image} alt={receiver?.username} className="w-24 h-24 object-cover mb-4 rounded-[50%]"/>
            <p className="font-semibold text-xl mb-4">{receiver?.username}</p>
            <button className="bg-gray text-sm py-2 w-[173px] rounded-lg">View profile</button>
        </div>
        <div className="px-3.5 mb-16 text-xs">
            {messages?.map((message) => (
                <div key={message._id} className="flex justify-start">
                    {message.author.username === user?.username ? (<>
                        <div
                            className="flex gap-4 mb-2 py-5 px-4 bg-purple text-white w-[397px] rounded-2xl ml-auto">
                            <p>{message.content}</p>
                        </div>
                        <img src={user?.profile_image} alt={user?.username}
                             className="w-7 h-7 object-cover rounded-[50%] ml-2"/>
                    </>) : (<>
                        <img src={message.author.profile_image} alt={user?.username}
                             className="w-7 h-7 object-cover rounded-[50%] mr-2"/>
                        <div className="flex gap-4 mb-2 py-5 px-4 bg-gray w-[397px] rounded-2xl">
                            <p>{message.content}</p>
                        </div>
                    </>)}
                </div>
            ))}
        </div>
        <input className="mx-3.5 px-8 py-3 w-[96%] rounded-3xl border border-gray text-sm"
               placeholder="Write message"
                value={newMessage}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {setNewMessage(e.target.value)}}
               onKeyDown={(e) => onInputKeyDown(e)}
                />
    </div>);
};