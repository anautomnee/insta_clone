import {Navigate} from "react-router";
import {Footer} from "../../components/Footer/Footer.tsx";

export const HomePage = ({token}:{token: string | null}) => {
    if(!token){
        return <Navigate to='/login' replace />
    }
    return (<>
        <Footer/>
    </>);
};