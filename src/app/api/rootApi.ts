import axios from 'axios';
import { baseUrl } from './config';
const rootApi = axios.create({
    baseURL: baseUrl,
});

export default rootApi;