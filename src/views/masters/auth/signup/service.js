import axios from 'axios';

export const signup = data => dispatch => {
	return axios.post("/admin/login" , data)
}