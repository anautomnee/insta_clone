import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const MessagesPage = () => {
    const user = useSelector((state: RootState) => state.user);
    return (<div className="flex h-full">
        <div className="w-[398px] border-r border-r-gray">
            <p className="font-semibold ml-6 mt-9 mb-14">{user?.username}</p>
        </div>
        <div></div>
    </div>);
}