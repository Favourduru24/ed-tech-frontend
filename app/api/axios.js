import axios from "axios"
import { url } from "@/libs/url"

export const imageCofig = axios.create({
     baseURL: 'https://ed-tech-backend-gt4n.onrender.com'
})