import axios from "axios"

export const imageCofig = axios.create({
     baseURL: 'http://localhost:4000'
})