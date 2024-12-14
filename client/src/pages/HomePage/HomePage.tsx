import {useRedirectIfNotAuthenticated} from "../../uitls/customHooks.ts";

export const HomePage = ({token}:{token: string | null}) => {
    const redirected = useRedirectIfNotAuthenticated(token);
    if (redirected) return null;
    return (<>
        <p>HOMEPAGE</p>
    </>);
};