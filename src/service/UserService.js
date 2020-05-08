import axios from 'axios';
import AuthService from './AuthService';

const USER_API_BASE_URL = 'http://localhost:8080/api/user';

class UserService {


    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' , user, AuthService.getAuthHeader());
    }

}

export default new UserService();