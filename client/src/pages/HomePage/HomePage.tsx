import {useFetchUserAfterReload, useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";
import { useSelector} from "react-redux";
import { RootState} from "../../store/store.ts";

export const HomePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    const user = useSelector((state: RootState) => state.user);
    useFetchUserAfterReload(user);
    if (redirected) return null;
    return (<>
        <p>HOMEPAGE</p>
    </>);
};