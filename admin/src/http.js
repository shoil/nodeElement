import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:3030/admin/api'
})
export default http