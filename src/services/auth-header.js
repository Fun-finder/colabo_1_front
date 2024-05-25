import axios from 'axios';

const API_URL = '/api/v1/user';

async function getCsrfToken() {
    try {
        const response = await axios.get(API_URL + '/csrf');
        console.log('토큰: ', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error('CSRF 토큰을 가져오는 중 오류 발생:', error);
        throw error.response ? error.response.data : error.message;
    }
}

export default async function authHeader() {
    try {
        const csrfToken = await getCsrfToken();
        const jwtToken = localStorage.getItem('jwtToken');
        const headers = {
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type': 'application/json'
        };
        if (jwtToken) {
            headers['Authorization'] = jwtToken;
        }
        return headers;
    } catch (error) {
        console.error('헤더를 구성하는 중 오류 발생:', error);
        throw error;
    }
}
