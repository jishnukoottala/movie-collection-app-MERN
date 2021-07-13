import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Loader } from './Loader'
import {
    Flex,
    Box,
    Image,
    Heading,
    Text,
    Button,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { MovieForm } from './MovieForm'

export const MovieDetail = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isEditMode, setIsEditMode] = useState(false)
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        showError: false,
        errorMessage: 'Some error occured',
    })

    const { id } = useParams()
    const history = useHistory()
    const toast = useToast()

    const onConfirmDelete = async () => {
        try {
            const authToken = localStorage.getItem('token')

            const axiosAuth = axios.create({
                headers: {
                    Authorization: authToken ? `Bearer ${authToken}` : null,
                },
            })
            const res = await axiosAuth.delete(`/api/v1/movies/${id}`)
            const { success } = res.data
            if (success) {
                toast({
                    position: 'bottom-left',
                    variant: 'left-accent',
                    render: () => (
                        <Flex>
                            <Alert status="success">
                                <AlertIcon />

                                <AlertDescription>
                                    Movie Deleted Successfully
                                </AlertDescription>
                            </Alert>
                        </Flex>
                    ),
                })
                history.push('/')
            }
        } catch (err) {
            toast({
                position: 'bottom-left',
                render: () => (
                    <Flex>
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle mr={2}>Error :</AlertTitle>
                            <AlertDescription>
                                {err.toString()}
                            </AlertDescription>
                        </Alert>
                    </Flex>
                ),
            })
        }
        onClose()
    }

    const getMovie = async () => {
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
            const res = await axiosAuth.get(`/api/v1/movies/${id}`)
            console.log(res)
            if (res?.data?.success) {
                setMovie(res.data.data)
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
        getMovie()
        return () => {}
    }, [])

    if (loading) {
        return (
            <Box mt={4}>
                <Loader />
            </Box>
        )
    }

    return (
        <>
            {' '}
            {!loading && !isEditMode && (
                <Flex
                    justifyContent="center"
                    flexGrow={1}
                    p={4}
                    flexDirection="column"
                >
                    <Flex justifyContent="center" mb={3}>
                        {' '}
                        <Image
                            src={movie.coverImage}
                            alt="movie_poster"
                            width="60%"
                            height="auto"
                        />
                    </Flex>
                    <Flex justifyContent="center" flexDirection="column">
                        <Heading
                            as="h2"
                            size="xl"
                            mb={3}
                            textAlign="center"
                            fontFamily="Lato"
                        >
                            {movie.title}{' '}
                        </Heading>
                        <Heading as="h3" size="lg" mb={3} textAlign="center">
                            {movie.releasedYear}{' '}
                        </Heading>
                        <Text>Genre : {movie.genre}</Text>
                        <Text>Rating : {movie.rating}</Text>
                        <Text>Review : {movie.review}</Text>
                        <Text>
                            Added to Collection on :{' '}
                            {new Date(movie.createdAt).toLocaleDateString()}
                        </Text>
                    </Flex>
                    <Flex justifyContent="center" mt={5}>
                        <Button
                            backgroundColor="orange.400"
                            size="md"
                            mr={3}
                            color="white"
                            onClick={() => setIsEditMode(true)}
                        >
                            Edit
                        </Button>
                        <Button colorScheme="red" size="md" onClick={onOpen}>
                            Delete
                        </Button>
                    </Flex>
                </Flex>
            )}
            {isEditMode && (
                <MovieForm
                    isEdit
                    afterEditCallBack={() => {
                        getMovie()
                        setIsEditMode(false)
                    }}
                    initData={{ ...movie }}
                />
            )}
            <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete the movie?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Are you sure, you want to delete? you won't be able to
                        undo the action!
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            onClick={onConfirmDelete}
                        >
                            Delete
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
