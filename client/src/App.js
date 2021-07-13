import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './auth/Authcontext'
import { Routes } from './routes/Routes'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes />
            </Router>
        </AuthProvider>
    )
}

function ChakraApp() {
    // 2. Use at the root of your app
    return (
        <ChakraProvider>
            <App />
        </ChakraProvider>
    )
}

export default ChakraApp
