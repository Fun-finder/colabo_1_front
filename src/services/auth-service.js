import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/v1/user';

class AuthService {
    async login(user) {
        try {
            console.log('auth:', user);
            const response = await axios.post(API_URL + '/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.headers.authorization;
            if (token) {
                localStorage.setItem('jwtToken', token);
                console.log('Login successful and token stored');
            } else {
                console.log('Token not found in response headers');
            }
            return response.data;
        } catch (error) {
            console.log('service error:', error);
            throw error.response.data;
        }
    }

    logout() {
        // 로그아웃 로직
        localStorage.removeItem('jwtToken');
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

    async getProfile() {
        try {
            const headers = await authHeader();
            const response = await axios.get(API_URL + '/profile', { headers });
            console.log('response.data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : error.message;
        }
    }
}

export default new AuthService();
