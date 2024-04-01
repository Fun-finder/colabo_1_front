import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/v1/user/';

class UserService{
    getUserContent(){
        return axios.get(API_URL + 'userContent', { header : authHeader()});
    }
}

export default new UserService();