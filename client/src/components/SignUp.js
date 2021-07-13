import React from 'react'
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
import { useAuth } from "../auth/Authcontext"

export const SignUp = () => {


    const { isAuthenticated, signIn } = useAuth()


    const onSubmit = ()=> {
        
    }

    if(isAuthenticated){
        <Redirect to="/" />
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
                <FormControl isInvalid={false} isRequired mb={4}>
                    <FormLabel htmlFor="name"> Name</FormLabel>
                    <Input id="name" placeholder="Full Name" />
                    <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false} isRequired mb={4}>
                    <FormLabel htmlFor="name"> Email</FormLabel>
                    <Input id="name" placeholder="email" />
                    <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={false} isRequired mb={4}>
                    <FormLabel htmlFor="name">Password</FormLabel>
                    <Input id="name" placeholder="password" />
                    <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={false} isRequired>
                    <FormLabel htmlFor="name">Repeat Password</FormLabel>
                    <Input id="name" placeholder="repeat password" />
                    <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <Box width="100%" textAlign="center" mt={16}>
                    <Button colorScheme="telegram" size="lg">
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
