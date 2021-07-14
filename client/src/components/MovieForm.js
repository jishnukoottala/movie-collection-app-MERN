import React, { useState } from 'react'
import {
    Container,
    Flex,
    Box,
    Button,
    FormControl,
    FormLabel,
    Text,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    Stack,
    Wrap,
    SliderThumb,
    Switch,
    Radio,
    RadioGroup,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useAuth } from '../auth/Authcontext'

const INITIAL_MOVIE_DATA = {
    title: '',
    releasedYear: 2020,
    rating: 1,
    review: '',
    coverImage: '',
    genre: '',
}

export const MovieForm = ({
    initData = INITIAL_MOVIE_DATA,
    isEdit = false,
    afterEditCallBack = () => {},
}) => {
    const toast = useToast()
    const { user } = useAuth()
    const [submitted, setSubmitted] = useState(false)

    const [moviedata, setMovieData] = useState(initData)
    console.log('moviedata', moviedata)

    const authToken = localStorage.getItem('token')

    const axiosAuth = axios.create({
        headers: {
            Authorization: authToken ? `Bearer ${authToken}` : null,
        },
    })

    const callSuccessToast = (message = 'Movie Added Successfully') => {
        toast({
            position: 'bottom-left',
            variant: 'left-accent',
            render: () => (
                <Flex>
                    <Alert status="success">
                        <AlertIcon />

                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                </Flex>
            ),
        })
    }

    const onSubmitForm = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            console.log('moviedata', moviedata)
            const newmoviedata = { ...moviedata }
            delete newmoviedata._id
            const res = isEdit
                ? await axiosAuth.patch(
                      `/api/v1/movies/${moviedata._id}`,
                      newmoviedata,
                      config
                  )
                : await axiosAuth.post('/api/v1/movies', moviedata, config)

            console.log('res is ', res)
            if (res.status === 201) {
                setMovieData(INITIAL_MOVIE_DATA)
                callSuccessToast()
            }
            if (res.status === 200) {
                isEdit && afterEditCallBack()
                callSuccessToast('Movie Updated Succeffully')
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
    }

    const handleChange = (event) => {
        setMovieData({ ...moviedata, [event.target.name]: event.target.value })
    }

    const trendChange = (event) => {
        setMovieData({
            ...moviedata,
            [event.target.name]: event.target.checked,
        })
    }

    const onReleasedYearChange = (_, value) => {
        setMovieData({ ...moviedata, releasedYear: value })
    }

    const onRatingChange = (value) => {
        setMovieData({ ...moviedata, rating: value })
    }

    const onGenreChange = (value) => {
        setMovieData({ ...moviedata, genre: value })
    }

    return (
        <Container px={[4, 0]}>
            <Flex direction="column" pt={4}>
                <Box mb={4}>
                    <FormLabel htmlFor="title" mb={1}>
                        Movie Title
                    </FormLabel>
                    <Input
                        placeholder="Pearl Harbour"
                        value={moviedata.title}
                        name="title"
                        id="title"
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="releasedYear" mb={1}>
                        Released Year : {moviedata.releasedYear}
                    </FormLabel>
                    <NumberInput
                        value={moviedata.releasedYear}
                        onChange={onReleasedYearChange}
                        defaultValue={2021}
                        min={1960}
                        max={2022}
                        id="releasedYear"
                        name="releasedYear"
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="coverurl" mb={1}>
                        Movie Cover/Poster URL
                    </FormLabel>
                    <Input
                        placeholder="https://www.picsum.photos/5"
                        value={moviedata.coverImage}
                        onChange={handleChange}
                        name="coverImage"
                        id="coverurl"
                    />
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="trailerUrl" mb={1}>
                        Trailer URL
                    </FormLabel>
                    <Input
                        placeholder="https://www.youtube.com/watch?v=Km-HXDB3sPg"
                        value={moviedata.trailerUrl}
                        onChange={handleChange}
                        name="trailerUrl"
                        id="trailerUrl"
                    />
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="director" mb={1}>
                        Director
                    </FormLabel>
                    <Input
                        placeholder="Movie Director"
                        value={moviedata.director}
                        name="director"
                        id="director"
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="musicDirector" mb={1}>
                        Music
                    </FormLabel>
                    <Input
                        placeholder="Music Director"
                        value={moviedata.musicDirector}
                        name="musicDirector"
                        id="musicDirector"
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="genre" mb={1}>
                        Genre
                    </FormLabel>
                    <RadioGroup
                        onChange={onGenreChange}
                        value={moviedata.genre}
                        name="genre"
                    >
                        <Stack direction="row">
                            <Wrap>
                                <Radio value="thriller">Thriller</Radio>
                                <Radio value="horror">Horror</Radio>
                                <Radio value="comedy">Comedy</Radio>
                                <Radio value="crime">Crime</Radio>
                                <Radio value="award">Award</Radio>
                                <Radio value="drama">Crime</Radio>
                            </Wrap>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="rating" mb={1}>
                        Rating : {moviedata.rating}
                    </FormLabel>
                    <Slider
                        name="rating"
                        aria-label="Rating"
                        colorScheme="telegram"
                        defaultValue={3}
                        onChange={onRatingChange}
                        min={0}
                        max={10}
                        value={moviedata.rating}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Box mb={4}>
                    <FormLabel htmlFor="review" mb="0">
                        Review
                    </FormLabel>
                    <Textarea
                        value={moviedata.review}
                        onChange={handleChange}
                        placeholder="Your review about the movie"
                        size="sm"
                        name="review"
                        id="review"
                    />
                </Box>
                {user.role === 'admin' && (
                    <>
                        <Box mb={4}>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="istrending" mb="0">
                                    Is Trending?
                                </FormLabel>
                                <Switch
                                    id="istrending"
                                    name="isTrending"
                                    isChecked={moviedata.isTrending}
                                    onChange={trendChange}
                                />
                            </FormControl>
                        </Box>
                        <Box mb={4}>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="isUpcoming" mb="0">
                                    Is Upcoming?
                                </FormLabel>
                                <Switch
                                    id="isUpcoming"
                                    name="isUpcoming"
                                    isChecked={moviedata.isUpcoming}
                                    onChange={trendChange}
                                />
                            </FormControl>
                        </Box>
                    </>
                )}
                <Box mt={3}>
                    <Center>
                        <Button
                            colorScheme="telegram"
                            size="md"
                            onClick={onSubmitForm}
                        >
                            Submit
                        </Button>
                    </Center>
                </Box>
            </Flex>
        </Container>
    )
}
