import { useForm, SubmitHandler } from "react-hook-form";
import style from "./AuthorizationForm.module.css";

type FormInputs = {
    email?: string,
    usernameOrEmail?: string
    fullName?: string,
    username?: string,
    password: string
};

type AuthorizationFormProps = {
    type: string
}

export const AuthorizationForm = ({type}: AuthorizationFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        if (type === "register") {
            console.log("register", data);
        } else if (type === "login") {
            console.log("login", data);
        } else if (type === "reset") {
            console.log("reset", data);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.formContainer} flex flex-col gap-1.5 text-[darkgray] w-full`}
        >
            {type === "register" && (
                <>
                    <input {...register("email", {required: true})} placeholder="Email"/>
                    {errors.email && <span className={style.error}>Email is required</span>}
                    <input {...register("fullName", {required: true, maxLength: 32})} placeholder="Full Name"/>
                    {errors.fullName && <span className={style.error}>Full name must be less than 32 characters</span>}
                    <input {...register("username", {required: true, maxLength: 24})} placeholder="Userame"/>
                    {errors.username && <span className={style.error}>Username must be less that 24 characters</span>}
                </>
            )
            }
            {type !== "register" && (
                <>
                    <input {...register("usernameOrEmail", {required: true, maxLength: 24})}
                           placeholder="Username, or email"/>
                    {errors.usernameOrEmail &&
                        <span className={style.error}>Username or email must be less that 24 characters</span>}
                </>)}
            {type !== "reset" && (<>
                <input {...register("password", {required: true, minLength: 8})} placeholder="Password"/>
                {errors.password && <span className={style.error}>Password must be more than 8 characters</span>}
            </>)}
            {type === "register" && (
                <>
                    <p className="text-xs mt-2.5 mb-4">People who use our service may have uploaded your contact information to
                        Instagram. <a
                            className="text-darkblue cursor-pointer">Learn More</a></p>
                    <p className="text-xs mb-4">By signing up, you agree to our <a
                            className="text-darkblue cursor-pointer">Terms</a>, <a
                            className="text-darkblue cursor-pointer">Privacy
                            Policy</a> and <a className="text-darkblue cursor-pointer">Cookies Policy</a>.</p>
                </>
            )}
            <button className="mt-3.5" type="submit">{type === "register" ? "Sign up" : "Login"}</button>
        </form>
    );
}