import axios from 'axios'

export default () => {

    return axios.create({
        baseURL: `https://twilight-api.onrender.com/api/`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }   
    })
}