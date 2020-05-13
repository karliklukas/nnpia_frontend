import axios from 'axios';

const USER_API_BASE_URL = 'https://nnpia-karlik.herokuapp.com/public/';

class PublicService {


    fetchStatus(cartId){
        return axios.get(USER_API_BASE_URL+'cart/status?id='+cartId);
    }

    getTopUsers(){
        return axios.get(USER_API_BASE_URL+'cart/top')
    }

    addCart(cart) {
        return axios.post(USER_API_BASE_URL+ 'cart', cart);
    }

    addUser(user) {
        return axios.post(USER_API_BASE_URL+ 'user', user);
    }


}

export default new PublicService();