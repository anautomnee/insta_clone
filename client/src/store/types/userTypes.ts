import {User} from "./instanceTypes.ts";

export type fetchUserData = {
    id: string,
    token: string,
}

export interface UserState extends User {
    status: string,
    error: string | null,
}