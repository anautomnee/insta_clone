import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchUser} from "../../store/actionCreators/userActionCreators.ts";
import {ProfileHeader} from "../../components/ProfileHeader/ProfileHeader.tsx";

export const ProfilePage = ({token}: {token:string | null}) => {
    const user = useSelector((state: RootState) => state.user)
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (user.username == '' && id && token) {
            dispatch(fetchUser({id, token}))
        }
    }, [user]);
    console.log(user)
    return (
        <>
            <ProfileHeader user={user}/>
        </>
    );
};