import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import {Outlet} from "react-router";
import {UserState} from "../../store/types/userTypes.ts";

export const MessagesPage = () => {
    const redirected: boolean = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    const user: UserState = useSelector((state: RootState) => state.user);

    return (<div className="flex h-full">
        <div className="min-w-[398px] border-r border-r-gray">
            <p className="font-semibold ml-6 mt-9 mb-14">{user?.username}</p>
        </div>
        <Outlet context={{ user }} />
    </div>);
}