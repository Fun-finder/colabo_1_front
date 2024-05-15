// auth-service.js
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/v1/user';

class AuthService {
    async login(user) {
        try {
            const response = await axios.post(API_URL + '/login', {
                body: JSON.stringify(user)
            } ,{headers: {
                'Content-Type': 'application/json'
              }}
            // , { headers: await authHeader() }
        ); // CSRF 토큰을 요청 헤더에 포함
            // console.log('response.data::', response.data)
            return response.data; // 반환된 데이터에 접근하여 사용자 정보를 반환
        } catch (error) {
            throw error.response.data; 
        }
    }

    logout() {
        // 로그아웃 로직
    }

    async join(user) {
        try {
            const response = await axios.post(API_URL + '/join', {
                loginId: user.loginId,
                password: user.password,
                email: user.email
            }, { headers: await authHeader() });
            return response.data;
        } catch (error) {
            throw error.response.data; 
        }
    }

    async getUserContent() {
        try {
            const response = await axios.post(API_URL + '/userContent', {}, { headers: await authHeader() });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}

export default new AuthService();
