import axios from 'axios';

const API_URL = '/api/v1/user'; // 수정된 부분

async function getCsrfToken() {
    try {
        const response = await axios.get(API_URL + '/csrf');
        console.log('토큰: ', response.data.token)
        return response.data.token;
    } catch (error) {
        throw error.response.data;
    }
};

async function authHeader() {
    const csrfToken = await getCsrfToken();
    return {
        'X-CSRF-TOKEN': csrfToken
    };
};

export default authHeader;
