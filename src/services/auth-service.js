import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/user/';

class AuthService {
    login(user){
        return axios
            .post(API_URL + 'login', {
                username: user.username,
                password: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data;
            })
    }

    logout(){
        localStorage.removeItem('user');
        //이것뿐만 아니라 axios로 통신해서 session에서 값 제거

    }

    join(user){
        return axios.post(API_URL + 'join', {
            username : user.username,
            password: user.password,
            email: user.email 
            //back단이랑 맞추려면 nickname도 있어야 함
        })
    }

    handleResponse(response){
        if(response.status == 401){
            this.logout();
            location.reload(true);

            const error = response.data && response.data.message;
            return Promise.reject(error);
        }
    }

}
export default new AuthService();