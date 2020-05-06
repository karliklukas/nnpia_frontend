import axios from 'axios';
import AuthService from './AuthService';

const USER_API_BASE_URL = 'http://localhost:8080/api/cart';

class CartService {

    fetchCarts(pageNo, pageSize, sortBy) {
        return axios.get(USER_API_BASE_URL+ '/p?pageSize=' + pageSize+'&pageNo=' + pageNo+'&sortBy=' + sortBy, AuthService.getAuthHeader());
    }

    takeCart(id) {
        return axios.get(USER_API_BASE_URL+ '/take?id=' + id+'&username=' + AuthService.getUserInfo().username, AuthService.getAuthHeader());
    }


}

export default new CartService();