import {AuthorizationForm} from "../../components/AuthorizartionForm/AuthorizationForm.tsx";
import style from "./RegisterPage.module.css";
import logo from "../../assets/logo.svg"
import {Link} from "react-router";

export const RegisterPage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className={`${style.container} flex flex-col items-center justify-center border px-10 py-10`}>
                <img src={logo} alt="Ichgram"/>
                <p className="text-darkgray text-center mb-9 mt-4 text-md font-semibold">Sign up to see photos and videos from your friends.</p>
                <AuthorizationForm type="register" />
            </div>
            <div className="flex items-center justify-center border border-gray py-[26px] px-[96px] mt-6">
                <p className="text-center text-sm">Have an account? <Link className="text-blue" to="/login">Log in</Link></p>
            </div>
        </div>
    )
};