import {SubmitHandler, useForm} from "react-hook-form";

type EditPostFormProps = {
    postContent: string | undefined;
}

export const EditPostForm = ({postContent}: EditPostFormProps) => {

    type EditPostInputs = {
        content: string;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditPostInputs>();

    const onEditPost: SubmitHandler<EditPostInputs> = (data: EditPostInputs): void => {
        console.log("onEditPost", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onEditPost)}
            className="flex flex-col gap-4 p-5">
            {errors.content && <p className="pl-3.5 pt-2 text-xs text-error">The comment should be less than 120
                characters</p>}
            <textarea
                defaultValue={postContent}
                {...register('content', {required: true, maxLength: 120})}
                className="py-2.5 outline-0 min-h-[240px]
                border-b border-b-gray"/>
            <div className="flex gap-4 justify-end">
                <button>Go back</button>
                <input type="submit" value="Edit"/>
            </div>
        </form>
    )
}