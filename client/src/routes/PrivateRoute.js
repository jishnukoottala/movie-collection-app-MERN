import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../auth/Authcontext'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth()
    return (
        <Route
            {...rest}
            component={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    )
}
