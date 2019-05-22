import axios from 'axios'
import { BASE_URL } from '@/configs/config'

export const httpService = axios.create({
  baseURL: BASE_URL
})
