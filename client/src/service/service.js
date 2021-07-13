import axios from 'axios'

const instance = axios.create()

const AUTH_TOKEN = localStorage.getItem('token')

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`

export default instance
