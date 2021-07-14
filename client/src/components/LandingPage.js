import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LandingPageTile } from './LandingPageTile'
import { Grid, Flex, Heading, Divider } from '@chakra-ui/react'
import { Loader } from './Loader'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

export const LandingPage = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        showError: false,
        errorMessage: 'Some error occured',
    })

    const getMovies = async () => {
        setLoading(true)
        try {
            setError({
                showError: false,
                errorMessage: '',
            })

            const res = await axios.get('/api/v1/trending')
            console.log(res)
            if (res?.data?.success) {
                setMovies(res.data.data)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            setError({
                showError: true,
                errorMessage: err.toString(),
            })
        }
    }

    useEffect(() => {
        getMovies()
    }, [])
    if (error.showError) {
        return (
            <Flex>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Error!</AlertTitle>
                    <AlertDescription>{error.errorMessage}</AlertDescription>
                </Alert>
            </Flex>
        )
    }
    return (
        <Flex mt={4} height="100%" p={4} flexDirection="column">
            {loading && <Loader />}
            {!loading && (
                <Heading as="h3" size="lg" mb={2}>
                    Trending
                </Heading>
            )}
            <Grid
                templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                gap={6}
                width="100%"
            >
                {!loading &&
                    movies
                        .filter((movie) => movie.isTrending)
                        .map((item) => (
                            <LandingPageTile
                                key={item._id}
                                {...item}
                                getMovies={getMovies}
                            />
                        ))}
            </Grid>

            <Divider orientation="horizontal" my={4} />

            {!loading && (
                <Heading as="h3" size="lg" mb={2}>
                    Upcoming
                </Heading>
            )}
            <Grid
                templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                gap={6}
                width="100%"
            >
                {!loading &&
                    movies
                        .filter((movie) => movie.isUpcoming)
                        .map((item) => (
                            <LandingPageTile
                                key={item._id}
                                {...item}
                                getMovies={getMovies}
                            />
                        ))}
            </Grid>
        </Flex>
    )
}
