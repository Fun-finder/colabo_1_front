import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/v1/article';

class ArticleService {
    async fetchArticles(loginId, pageNo){
        try {
            const response = await axios.get(`${API_URL}/${loginId}`, { page : pageNo}, { headers : await authHeader() });
            return response.data;
        } catch {
            console.error('Error fetching article data:', error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : error.message;
        }
    }
    
}