import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";

export const HomePage = () => {
    const redirected = useRedirectIfNotAuthenticated();
    if (redirected) return null;
    return (<>
        <p>HOMEPAGE</p>
    </>);
};