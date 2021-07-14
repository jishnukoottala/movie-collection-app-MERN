import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    Button,
    Grid,
    Flex,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import axios from 'axios'
import { MovieTile } from './MovieTile'
import { Loader } from './Loader'

export const Home = () => {
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

            const authToken = localStorage.getItem('token')

            const axiosAuth = axios.create({
                headers: {
                    Authorization: authToken ? `Bearer ${authToken}` : null,
                },
            })
            const res = await axiosAuth.get('/api/v1/movies')

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
        return () => {}
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
        <Flex flexDirection="column">
            <Link to="/create">
                {' '}
                <Box my={4}>
                    <Center>
                        <Button colorScheme="teal" variant="outline">
                            Create a Record
                        </Button>
                    </Center>
                </Box>
            </Link>
            <Flex mt={4} height="100%" p={4}>
                {loading && <Loader />}
                <Grid
                    templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
                    gap={6}
                    width="100%"
                >
                    {!loading &&
                        movies.map((item) => (
                            <MovieTile
                                key={item._id}
                                {...item}
                                getMovies={getMovies}
                            />
                        ))}
                </Grid>
            </Flex>
        </Flex>
    )
}
