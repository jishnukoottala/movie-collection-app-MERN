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

export const SignUp = () => {
    const { isAuthenticated, signUp, authError } = useAuth()

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [isNameValid, setIsNameValid] = useState(true)

    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(undefined)
    const [isUsernameValid, setIsUsernamevalid] = useState(true)

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(undefined)
    const [isPasswordValid, setIsPasswordvalid] = useState(true)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmpasswordError, setconfirmPasswordError] = useState(undefined)
    const [isConfirmPasswordValid, setIsConfirmPasswordvalid] = useState(true)

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        setPasswordError(undefined)
        setIsPasswordvalid(true)
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setconfirmPasswordError(undefined)
        setIsConfirmPasswordvalid(true)
    }

    const onNameChange = (e) => {
        setName(e.target.value)
        setNameError(undefined)
        setIsNameValid(true)
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
        setUsernameError(undefined)
        setIsUsernamevalid(true)
    }

    const checkValidations = () => {
        let validationPassed = false

        if (name === '') {
            setNameError('Name cannot be empty')
            setIsNameValid(false)
        }
        if (username === '') {
            setUsernameError('Username cannot be empty')
            setIsUsernamevalid(false)
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
        if (password === '') {
            setPasswordError('Password cannot be empty')
            setIsPasswordvalid(false)
        }
        if (confirmPassword === '') {
            setconfirmPasswordError('Please repeat the password')
            setIsConfirmPasswordvalid(false)
        } else if (confirmPassword !== password) {
            setconfirmPasswordError('Passwords do not match')
            setIsConfirmPasswordvalid(false)
        }

        return validationPassed
    }

    const onSubmit = () => {
        const validationsPassed = checkValidations()
        if (validationsPassed) {
            signUp(username, password, name)
            if (authError) {
                console.log('error ')
            }
        }
    }

    console.log('authError', authError)

    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <Flex minHeight="90vh" backgroundColor="#edf2f4">
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
                    Sign Up
                </Heading>
                <FormControl isInvalid={!isNameValid} isRequired mb={4}>
                    <FormLabel htmlFor="fullname"> Name</FormLabel>
                    <Input
                        id="fullname"
                        placeholder="Full Name"
                        name={name}
                        onChange={onNameChange}
                    />
                    <FormErrorMessage>{nameError}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!isUsernameValid} isRequired mb={4}>
                    <FormLabel htmlFor="username"> Email</FormLabel>
                    <Input
                        id="username"
                        placeholder="email"
                        value={username}
                        onChange={onUsernameChange}
                    />
                    <FormErrorMessage>{usernameError}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!isPasswordValid} isRequired mb={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={onPasswordChange}
                        type="password"
                    />
                    <FormErrorMessage>{passwordError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isConfirmPasswordValid} isRequired>
                    <FormLabel htmlFor="confirmpassword">
                        Repeat Password
                    </FormLabel>
                    <Input
                        id="confirmpassword"
                        type="password"
                        placeholder="repeat password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                    />
                    <FormErrorMessage>{confirmpasswordError}</FormErrorMessage>
                </FormControl>
                <Box width="100%" textAlign="center" mt={16}>
                    <Button colorScheme="telegram" size="lg" onClick={onSubmit}>
                        Sign Up
                    </Button>
                </Box>
                <Box width="100%" textAlign="center" mt={2} mb={5}>
                    <Text>
                        Already have an account?{' '}
                        <RouterLink to="/signin">
                            <Link color="blue.500">Sign In Now</Link>
                        </RouterLink>{' '}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}
