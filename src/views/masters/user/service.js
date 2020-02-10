import axios from 'axios';

export const createUser = data => dispatch => {
	return axios.post("/user/empAdd" , data)
}
