import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchUser} from "../../store/actionCreators/userActionCreators.ts";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";

export const ProfilePage = ({token}: {token:string | null}) => {
    const user = useSelector((state: RootState) => state.user);
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (user.username == '' && id && token) {
            dispatch(fetchUser({id, token}))
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center gap-16">
            <div className="flex flex-col gap-16">
                <ProfileHeader user={user}/>
                <div className="grid grid-cols-3 gap-2">
                    {user.posts && user.posts.length > 0 && user.posts.map((post) => (<div
                        key={post._id}
                        className="w-[307px] h-[307px] overflow-hidden">
                        <img
                            src={post.photo}
                            alt="Post"
                            className="w-full h-full object-cover"
                        />
                    </div>))}
                </div>
            </div>
            </div>
            );
            };