import {ChangeEvent, MouseEvent, RefObject, useEffect, useState} from "react";
import {CondensedUser} from "../../store/types/instanceTypes.ts";
import {getAllUsersForSearch} from "../../uitls/apiCalls.ts";
import cancel from '../../assets/search_cancel.svg';
import {Link} from "react-router";
import arrow_back from "../../assets/arrow_back.svg";

type SearchModalProps = {
    modalRef: RefObject<HTMLDivElement>;
}

export const SearchModal = ({modalRef}: SearchModalProps) => {
   const [users, setUsers] = useState<CondensedUser[]>([]);
   const [matchingUsers, setMatchingUsers] = useState<CondensedUser[]>([]);
   const [searchInput, setSearchInput] = useState("");

   useEffect(() => {
       const fetchUsers = async () => {
           const token = localStorage.getItem("userToken");
           if (!token) return;
           const users = await getAllUsersForSearch(token);
           setUsers(users);
       }
       if (users.length === 0) fetchUsers();
   }, [users]);

    const closeModal = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current) {
            e.stopPropagation();
            modalRef.current.hidden = true;
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
        if (e.target.value.length < 1) {
            setMatchingUsers([]);
            return;
        }
        if (users.length === 0) return;
        const regex = new RegExp(e.target.value, 'i');
        const filtered = users.filter((user: CondensedUser) => regex.test(user.username));
        setMatchingUsers(filtered);
    }

    return (<div
        className="absolute h-[calc(100vh-81px)] md:h-screen top-0 w-screen
            lg:w-[calc(100vw-60px)] left-0 md:left-[60px] lgg:left-[244px]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
        onClick={closeModal}
    >
            <div className="bg-white opacity-100 h-[calc(100vh-81px)] md:h-screen md:rounded-r-xl
            md:w-[397px] w-full md:py-5 md:px-6"
                 onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className="flex md:hidden justify-between p-3 border-b border-b-gray">
                    <img src={arrow_back} alt="Back" onClick={closeModal}/>
                    <p className="font-semibold">Search</p>
                    <p></p>
                </div>
                <div className="px-6 md:px-0 py-5 md:py-0">
                    <p className="hidden md:block font-semibold text-xl mb-4">Search</p>
                    <div className="relative">
                        <input value={searchInput}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                               placeholder="Search"
                               className="bg-gray rounded-lg w-full py-2.5 pl-4 pr-10 placeholder:text-darkgray"/>
                        <img className="absolute bottom-2.5 right-2"
                             src={cancel} alt="Cancel"
                             onClick={() => {
                                 setSearchInput("");
                                 setMatchingUsers([]);
                             }}/>
                    </div>
                    <div className="flex flex-col mt-12 gap-3">
                        {matchingUsers.length > 0 && matchingUsers.map((user: CondensedUser) => (
                            <Link to={`/profile/${user.username}`} key={user._id} className="flex items-center gap-3">
                                <img src={user.profile_image} alt="profile_image"
                                     className="w-10 h-10 object-cover rounded-[50%]"/>
                                <p className="font-semibold">{user.username}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};