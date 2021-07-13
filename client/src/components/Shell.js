import React from 'react'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/Authcontext'

export const Shell = ({ children }) => {
    const { isAuthenticated, signOut } = useAuth()

    return (
        <Flex flexDirection="column">
            <Flex
                background="linear-gradient(to right, #000428, #004e92);"
                py={[6, 4]}
                px={[2, 6]}
                color="#fff"
                fontFamily="Montserrat"
                justifyContent="space-between"
            >
                <Link to="/">
                    <Text fontSize="xl" fontWeight="bold">
                        My Moviebase
                    </Text>
                </Link>
                {!isAuthenticated && (
                    <Box>
                        <Link to="/signin">
                            <Button colorScheme="messenger">Sign In</Button>
                        </Link>
                    </Box>
                )}
                {isAuthenticated && (
                    <Box>
                        {' '}
                        <Button colorScheme="messenger" onClick={signOut}>
                            Sign Out
                        </Button>
                    </Box>
                )}
            </Flex>
            {children}
        </Flex>
    )
}
