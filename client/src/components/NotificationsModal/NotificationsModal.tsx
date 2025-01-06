import {MouseEvent, RefObject} from "react";
import {Notification} from "../../store/types/instanceTypes.ts";
import {formatDate} from "../../uitls/utils.ts";
import arrow_back from '../../assets/arrow_back.svg'

type NotificationsModalProps = {
    modalRef: RefObject<HTMLDivElement>;
    notifications: Notification[];
}

export const NotificationsModal = ({modalRef, notifications}: NotificationsModalProps) => {
    const closeModal = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current) {
            e.stopPropagation();
            modalRef.current.hidden = true;
        }
    };
    return (<div
        className="absolute h-[calc(100vh-81px)] md:h-screen top-0 w-screen
            lg:w-[calc(100vw-60px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeModal}
    >
        <div className="bg-white opacity-100 h-[calc(100vh-81px)] md:h-screen md:rounded-r-xl
            md:w-[397px] w-full md:py-5 md:px-6"
             onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <div className="flex md:hidden justify-between p-3 border-b border-b-gray">
                <img src={arrow_back} alt="Back" onClick={closeModal} />
                <p className="font-semibold">Notifications</p>
                <p></p>
            </div>
            <div className="px-6 md:px-0 py-5 md:py-0">
                <p className="hidden md:block font-semibold text-xl mb-4">Notifications</p>
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
                                <span
                                    className="text-darkgray ml-2">{formatDate(new Date(notification.createdAt))}</span>
                            </p>
                        </div>
                        <img src={notification?.post?.photo || notification?.comment?.post.photo}
                             alt="photo"
                             className="w-11 h-11 object-cover"/>

                    </div>))}
                </div>
            </div>
        </div>
        </div>
    );
};