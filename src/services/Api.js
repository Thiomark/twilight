import axios from 'axios'

export default () => {

    return axios.create({
        baseURL: `http://localhost:5000/api/`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }   
    })
}