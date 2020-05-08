import axios from 'axios';
import AuthService from './AuthService';

const USER_API_BASE_URL = 'http://localhost:8080/api/cart';

class CartService {

    fetchCarts(pageNo, pageSize, sortBy) {
        return axios.get(USER_API_BASE_URL+ '/p?pageSize=' + pageSize+'&pageNo=' + pageNo+'&sortBy=' + sortBy, AuthService.getAuthHeader());
    }

    fetchCartsByUser(pageNo, pageSize, sortBy, userId, done) {
        return axios.get(USER_API_BASE_URL+ '/p?pageSize=' + pageSize+'&pageNo=' + pageNo+'&sortBy=' + sortBy
            +'&userId=' + userId+'&done=' + done, AuthService.getAuthHeader());
    }

    takeCart(id) {
        return axios.get(USER_API_BASE_URL+ '/take?id=' + id+'&username=' + AuthService.getUserInfo().username, AuthService.getAuthHeader());
    }

    setCartDone(id) {
        return axios.get(USER_API_BASE_URL+ '/done?id=' + id, AuthService.getAuthHeader());
    }

    fetchCounts() {
        return axios.get(USER_API_BASE_URL+ '/count?id='+ AuthService.getUserInfo().id, AuthService.getAuthHeader());
    }


}

export default new CartService();