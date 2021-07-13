import React from 'react'
import { Flex, Center, Spinner } from '@chakra-ui/react'

export const Loader = () => {
    return (
        <Flex grow={1} justifyContent="center">
            <Center>
                <Spinner size="xl" color="blue.500" />
            </Center>
        </Flex>
    )
}
