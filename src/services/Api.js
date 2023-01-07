import axios from 'axios'

export default () => {

    return axios.create({
        baseURL: `https://aqueous-temple-04096.herokuapp.com/api/`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }   
    })
}