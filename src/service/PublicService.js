import axios from 'axios';
import AuthService from './AuthService';

const USER_API_BASE_URL = 'http://localhost:8080/public/';

class PublicService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL, AuthService.getAuthHeader());
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    addCart(cart) {
        return axios.post(USER_API_BASE_URL+ 'cart', cart);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL+ 'user', user);
    }

}

export default new PublicService();