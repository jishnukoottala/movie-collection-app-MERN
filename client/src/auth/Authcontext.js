import React from 'react'
import { Loader } from '../components/Loader'
import axios from 'axios'
import service from '../service/service'

const AuthContext = React.createContext()

function AuthProvider(props) {
    // code for pre-loading the user's information if we have their token in
    // localStorage goes here
    // 🚨 this is the important bit.
    // Normally your provider components render the context provider with a value.
    // But we post-pone rendering any of the children until after we've determined
    // whether or not we have a user token and if we do, then we render a spinner
    // while we go retrieve that user's information.

    const [authData, setAuthData] = React.useState({
        loading: false,
        error: null,
        user: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null,
    })

    if (authData.loading) {
        return <Loader />
    }
    const signIn = async (email, password) => {
        try {
            setAuthData({
                loading: true,
                error: undefined,
            })
            const userObj = { email, password }
            const res = await axios.post('/api/v1/user/signin', userObj)
            console.log(res)
            if (res?.data?.user) {
                setAuthData({
                    loading: false,
                    error: undefined,
                    user: res.data.user,
                })
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }
            if (res.status === 204) {
                setAuthData({
                    loading: false,
                    error: 'Invalid credentials',
                    user: null,
                })
            }
        } catch (err) {
            console.log('is it in the catch')
            setAuthData({
                error: err.toString(),
                user: null,
            })
        }
    } // make a login request
    const isAuthenticated = authData.user !== null
    const authError = authData.error
    const user = authData.user
    const signUp = () => {} // register the user
    const signOut = async () => {
        try {
            const res = await service.post('/api/v1/user/signout')

            if (res.status === 200) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setAuthData({
                    error: undefined,
                    user: null,
                    loading: false,
                })
            }
        } catch (err) {
            //TODO: add toast notification
        }
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                authError,
                signIn,
                signOut,
                signUp,
            }}
            {...props}
        />
    )
}

const useAuth = () => React.useContext(AuthContext)
export { AuthProvider, useAuth }
