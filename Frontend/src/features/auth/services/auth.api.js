import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export async function register({username, email, password}) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (error) {
        console.log("Error in calling register route from frontend", error)
    }
}


export async function login({username, email, password}) {
    try {
        const response = await api.post('/api/auth/login', {
            username, email, password
        })

        return response.data

    } catch (error) {
        console.log("Error in calling login route from frontend", error)
    }
}


export async function logout() {
    try {
        const response = await api.get('/api/auth/logout')

        return response.data

    } catch (error) {
        console.log("Error in calling logout route from frontend", error)
    }
}


export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data

    } catch (error) {
        console.log("Error in calling get-me route from frontend", error)
    }
}