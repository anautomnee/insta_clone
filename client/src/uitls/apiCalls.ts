import axios from "axios";

let backendURL;

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
}