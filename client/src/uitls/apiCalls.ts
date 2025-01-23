import axios from "axios";

export const backendURL = import.meta.env.VITE_ENV === 'local'
    ? 'http://localhost:3001/api'
    : import.meta.env.VITE_BACKEND_URL;


export const axiosInstance = axios.create({
    baseURL: backendURL,
    withCredentials: true,
});

export const checkJWTToken = async () => {
    try {
        const result = await axiosInstance.get('/auth/check-access-token');
        return result.data.message === 'Token is valid';
    } catch(error) {
        console.error('Unexpected error during auth check:', error);
    }
};


export const addComment = async (content: string, postId: string) => {
    try {

        const response = await axiosInstance.post(
            `/comments/${postId}/add`,
            {content}
        );
        return response.data;
    } catch (error) {
        console.error('Error adding comment', error);
    }
};

export const likeComment = async (commentId: string) => {
    try {

        const response = await axiosInstance.post(
            `/comments/${commentId}/like`,
            {}
        );
        return response.data;
    } catch (error) {
        console.error('Error liking comment', error);
    }
};

export const unLikeComment = async (commentId: string) => {
    try {

        const response = await axiosInstance.delete(
            `/comments/${commentId}/unlike`
        );
        return response.data;
    } catch (error) {
        console.error('Error unliking comment', error);
    }
};

export const likePost = async (postId: string) => {
    try {

        const response = await axiosInstance.post(
            `/posts/${postId}/like`,
            {}
        );
        return response.data;
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const unLikePost = async (postId: string) => {
    try {

        const response = await axiosInstance.delete(
            `/posts/${postId}/unlike`
        );
        return response.data;
    } catch (error) {
        console.error('Error unliking post', error);
    }
};

export const fetchProfile = async (username: string, ) => {
    try {

        const response = await axiosInstance.get(
            `/users/${username}`
        );
        return response.data[0];
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const deletePost = async (postId: string) => {
    try {

        const response = await axiosInstance.delete(
            `/posts/${postId}`
        );
        return response.data;
    } catch (error) {
        console.error('Error unliking post', error);
    }
};

export const followUser = async (username: string) => {
    try {

        const response = await axiosInstance.post(
            `/users/${username}/follow`,
            {}
        );
        return response.data;
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const unfollowUser = async (username: string) => {
    try {

        const response = await axiosInstance.delete(
            `/users/${username}/unfollow`
        );
        return response.data;
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const getAllUsersForSearch = async () => {
    try {
        const response = await axiosInstance.get(
            `/users`
        );
        return response.data;
    } catch (error) {
        console.error('Error getting users', error);
    }
};

export const fetchChat = async (receiverUsername: string) => {
    try {

        const response = await axiosInstance.post(
            `/messages/get_chat`,
            {receiverUsername}
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages', error);
    }
};

export const fetchUserChats = async () => {
    try {

        const response = await axiosInstance.get(
            `/messages/get_user_chats`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages', error);
    }
};

export const fetchFollowedPosts = async (page: number) => {
    try {

        const response = await axiosInstance.get(
            `/posts/get_followed?page=${page}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages', error);
    }
};


export const getRandomPosts = async (fetchCount: number) => {
    try {
        const response = await axiosInstance.get(
            `/posts/random?count=${fetchCount}`
        );
        return response.data;
    } catch (error) {
        console.error('Error getting users', error);
    }
};

export const addUserToSearchResults = async(username: string) => {
    try {
        const response = await axiosInstance.post(
            "/users/add_to_search_results",
            {username}
        );
        return response.data;
    } catch (error) {
        console.error('Error adding user to search results', error);
    }
}