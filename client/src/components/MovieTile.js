import React from 'react'
import { Box, Flex, Image, Heading, Text, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'

export const MovieTile = ({
    coverImage,
    title,
    releasedYear,
    rating,
    genre,
    _id,
}) => {
    const toast = useToast()

    return (
        <Link to={`/movie/${_id}`}>
            <Flex
                border="1px solid gray"
                p={3}
                borderRadius={4}
                position="relative"
                boxShadow="xl"
            >
                <Box>
                    {' '}
                    <Image
                        src={coverImage}
                        alt="movie_poster"
                        width={183}
                        height={273}
                    />
                </Box>

                <Flex ml={3} flexDirection="column">
                    <Box mb={3}>
                        <Heading as="h4" size="lg" fontFamily="Lato">
                            {' '}
                            {title}{' '}
                        </Heading>
                    </Box>
                    <Text size="xl" fontWeight="bold" letterSpacing="0.085rem">
                        {releasedYear}
                    </Text>
                    <Text size="xl" fontWeight="bold" letterSpacing="0.085rem">
                        Rating: {rating}
                    </Text>
                    <Text>Genre : {genre}</Text>
                </Flex>
            </Flex>
        </Link>
    )
}
