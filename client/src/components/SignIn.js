import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Heading,
    Input,
    Button,
    Text,
    Link,
} from '@chakra-ui/react'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { useAuth } from '../auth/Authcontext'

export const SignIn = () => {
    const { isAuthenticated, signIn, authError } = useAuth()

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(undefined)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(undefined)
    const [isUsernameValid, setIsUsernamevalid] = useState(true)
    const [isPasswordValid, setIsPasswordvalid] = useState(true)

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        setPasswordError(undefined)
        setIsPasswordvalid(true)
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
        setUsernameError(undefined)
        setIsUsernamevalid(true)
    }
    console.log('authError', authError)

    const checkValidations = () => {
        let validationPassed = false

        if (username === '') {
            setUsernameError('Username cannot be empty')
            setIsUsernamevalid(false)
        } else if (password === '') {
            setPasswordError('Password cannot be empty')
            setIsPasswordvalid(false)
        } else {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (username.match(regexEmail)) {
                console.log('test pass --- ', username)
                setIsUsernamevalid(true)
                validationPassed = true
            } else {
                console.log('in valid ')
                setUsernameError('Username must be a valid email')
                setIsUsernamevalid(false)
            }
        }

        return validationPassed
    }

    const onSubmit = () => {
        const validationsPassed = checkValidations()
        if (validationsPassed) {
            signIn(username, password)
            if (authError) {
                setUsernameError(authError)
                setPasswordError(authError)
            }
        }
    }
    console.log('isAuthenticated', isAuthenticated)

    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Flex height="90vh" backgroundColor="#edf2f4">
            <Flex
                m={[6, 'auto']}
                p={5}
                pt={10}
                flexDirection="column"
                borderRadius="xl"
                boxShadow="xl"
                backgroundColor="white"
                alignItems="flex-start"
                flexGrow={1}
                maxWidth={['100%', 400]}
            >
                <Heading
                    as="h2"
                    size="xl"
                    mb={12}
                    textAlign="center"
                    fontFamily="Lato"
                    width="100%"
                >
                    Sign In
                </Heading>

                <FormControl isInvalid={!isUsernameValid} mb={4}>
                    <FormLabel htmlFor="name">Username/ Email</FormLabel>
                    <Input
                        id="name"
                        placeholder="username or email"
                        value={username}
                        onChange={onUsernameChange}
                    />
                    <FormErrorMessage>{usernameError}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!isPasswordValid}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="enter password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                    <FormErrorMessage>{passwordError}</FormErrorMessage>
                </FormControl>
                <Box width="100%" textAlign="center" mt={16}>
                    <Button colorScheme="telegram" size="lg" onClick={onSubmit}>
                        Sign In
                    </Button>
                </Box>
                <Box width="100%" textAlign="center" mt={2}>
                    <Text>
                        Don't have an account?{' '}
                        <RouterLink to="/signup">
                            <Link color="blue.500">Sign Up Now</Link>
                        </RouterLink>{' '}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}
