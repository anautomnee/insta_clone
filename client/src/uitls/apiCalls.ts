import axios from "axios";

export let backendURL: string;

if(import.meta.env.VITE_ENV === 'local') {
    backendURL = 'http://localhost:3001';
} else {
    backendURL = import.meta.env.VITE_BACKEND_URL;
}

export const addComment = async (content: string, token: string, postId: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            `${backendURL}/comments/${postId}/add`,
            {content},
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error adding comment', error);
    }
};

export const likeComment = async (token: string, commentId: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            `${backendURL}/comments/${commentId}/like`,
            {},
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error liking comment', error);
    }
};

export const unLikeComment = async (token: string, commentId: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.delete(
            `${backendURL}/comments/${commentId}/unlike`,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error unliking comment', error);
    }
};

export const likePost = async (token: string, postId: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            `${backendURL}/posts/${postId}/like`,
            {},
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const unLikePost = async (token: string, postId: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.delete(
            `${backendURL}/posts/${postId}/unlike`,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error unliking post', error);
    }
};

export const fetchProfile = async (username: string, token: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            `${backendURL}/users/${username}`,
            config
        );
        return response.data[0];
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const deletePost = async (token: string, postId: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.delete(
            `${backendURL}/posts/${postId}`,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error unliking post', error);
    }
};

export const followUser = async (token: string, username: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            `${backendURL}/users/${username}/follow`,
            {},
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const unfollowUser = async (token: string, username: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.delete(
            `${backendURL}/users/${username}/unfollow`,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error liking post', error);
    }
};

export const getAllUsersForSearch = async (token: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            `${backendURL}/users`,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error getting users', error);
    }
};

export const fetchChat = async (receiverUsername: string, token: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            `${backendURL}/messages/get_chat`,
            {receiverUsername},
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages', error);
    }
};

export const fetchUserChats = async (token: string) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.get(
            `${backendURL}/messages/get_user_chats`,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages', error);
    }
};