import axios from "axios";
import { BASE_URL } from "../environment/env-dev";


export const UseAxios = axios.create({
    baseURL: BASE_URL
})