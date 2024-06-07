import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/v1/id';

class SearchService {
    async idSearch(email) {
        try {
            const response = await axios.post(`${API_URL}/search`, { email }, { headers: await authHeader() });
            return response.data;
        } catch (error) {
            console.error('Error fetching idSearch data:', error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : error.message;
        }
    }

    async sendVerificationCode(email) {
        try {
            const response = await axios.post(`${API_URL}/send-verification-code`, { email }, { headers: await authHeader() });
            return response.data;
        } catch (error) {
            console.error('Error fetching verification code:', error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : error.message;
        }
    }
}

export default new SearchService();
