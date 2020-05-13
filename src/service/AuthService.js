import axios from 'axios';

const USER_API_BASE_URL = 'https://nnpia-karlik.herokuapp.com/token/';

class AuthService {

    login(credentials){
        return axios.post(USER_API_BASE_URL + "generate-token", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, null);
    }
}

export default new AuthService();