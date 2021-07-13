import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '../components/Home'
import { MovieForm } from '../components/MovieForm'
import { MovieDetail } from '../components/MovieDetail'
import { SignUp } from '../components/SignUp'
import { SignIn } from '../components/SignIn'
import { Shell } from '../components/Shell'
import { LandingPage } from '../components/LandingPage'
import { PrivateRoute } from './PrivateRoute'
import { useAuth } from '../auth/Authcontext'

export const Routes = () => {
    const { isAuthenticated } = useAuth()
    return (
        <Shell>
            <Switch>
                <Route path="/signin" exact>
                    <SignIn />
                </Route>
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
                <Route path="/" exact>
                    {isAuthenticated ? <Home /> : <LandingPage />}
                </Route>
                <PrivateRoute path="/create" exact component={MovieForm} />

                <PrivateRoute path="/movie/:id" exact component={MovieDetail} />
            </Switch>
        </Shell>
    )
}
