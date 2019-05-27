import axios from 'axios'
const http = axios.create({
    baseURL: 'http://local:3030/admin/api'
})
export default http