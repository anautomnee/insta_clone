import {MouseEvent, RefObject} from "react";
import {Notification} from "../../store/types/instanceTypes.ts";
import {formatDate} from "../../uitls/utils.ts";

type NotificationsModalProps = {
    modalRef: RefObject<HTMLDivElement>;
    notifications: Notification[];
}

export const NotificationsModal = ({modalRef, notifications}: NotificationsModalProps) => {
    const closeCreatePost = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current) {
            e.stopPropagation();
            modalRef.current.hidden = true;
        }
    };
    return (<div
        className="absolute h-[calc(100vh-81px)] md:h-screen top-0 w-screen
            lg:w-[calc(100vw-60px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeCreatePost}
    >
        <div className="bg-white opacity-100 h-[calc(100vh-81px)] md:h-screen md:rounded-r-xl
            md:w-[397px] w-full py-5 px-6"
             onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <p className="font-semibold text-xl mb-4">Notifications</p>
            <p className="font-semibold mb-4">New</p>
            <div className="flex flex-col gap-5">

                {notifications.length > 0 && notifications.map((notification: Notification) => (<div
                    key={notification._id}
                    className="flex justify-between">
                    <div className="flex gap-3.5">
                        <img src={notification.actionMaker.profile_image}
                             className="w-10 h-10 rounded-[50%] object-cover"
                            alt="profile_image"/>
                        <p className="w-40">
                            <span className="font-semibold mr-2">{notification.actionMaker.username}</span>
                            <span>{notification.type}</span>
                            <span className="text-darkgray ml-2">{formatDate(new Date(notification.createdAt))}</span>
                        </p>
                    </div>
                    <img src={notification?.post?.photo || notification?.comment?.post.photo}
                         alt="photo"
                        className="w-11 h-11 object-cover"/>

                </div>))}
            </div>
        </div>
    </div>
    );
};