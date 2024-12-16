type UserInfoAuthType = {
    id: string,
    username: string,
    profile_image: string,
}

export type authStateType = {
    status: string,
    error: string | null,
    userToken: string | null,
    userInfo: UserInfoAuthType | null,
}

export type LoginDataType = {
    usernameOrEmail: string,
    password: string,
}
export type RegisterDataType = {
    username: string,
    email: string,
    fullName: string,
    password: string,
}

export type ResetDataType = {
    usernameOrEmail: string,
}

export type loginPayloadType = {
    message: string,
    data?: any,
}