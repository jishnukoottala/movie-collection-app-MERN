import React from 'react'
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react'

export const LandingPageTile = ({
    coverImage,
    title,
    releasedYear,
    rating,
    genre,
    _id,
}) => {
    return (
        <Flex p={1} borderRadius={4} position="relative" boxShadow="xl">
            <Box width={['100%', 183]} height={273}>
                {' '}
                <Image
                    src={
                        coverImage !== ''
                            ? coverImage
                            : 'https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png'
                    }
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
    )
}
