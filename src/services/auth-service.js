// auth-service.js
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/v1/user';

class AuthService {
    async login(user) {
        try {
            const response = await axios.post(API_URL + '/login', {
                username: user.username,
                password: user.password
            });
            return response.data; // 반환된 데이터에 접근하여 사용자 정보를 반환
        } catch (error) {
            throw error.response.data; // 에러 응답을 캐치하여 처리
        }
    }

    logout() {
        // 로그아웃 로직
    }

    async join(user) {
        try {
            const response = await axios.post(API_URL + '/join', {
                username: user.username,
                password: user.password,
                email: user.email
            });
            return response.data; // 반환된 데이터에 접근하여 처리
        } catch (error) {
            throw error.response.data; // 에러 응답을 캐치하여 처리
        }
    }

    async getUserContent() {
        try {
            const response = await axios.post(API_URL + '/userContent', { headers: authHeader() })
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}

export default new AuthService();
