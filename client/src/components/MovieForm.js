import React, { useState } from 'react'
import {
    Container,
    Flex,
    Box,
    Button,
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
                    <Text mb={1} as="label">
                        Movie Title
                    </Text>
                    <Input
                        placeholder="Pearl Harbour"
                        value={moviedata.title}
                        name="title"
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={4}>
                    <Text mb={1} as="label">
                        Released Year : {moviedata.releasedYear}
                    </Text>
                    <NumberInput
                        value={moviedata.releasedYear}
                        onChange={onReleasedYearChange}
                        defaultValue={2021}
                        min={1960}
                        max={2022}
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
                    <Text mb={1} as="label">
                        Cover URL
                    </Text>
                    <Input
                        placeholder="https://www.picsum.photos/5"
                        value={moviedata.coverImage}
                        onChange={handleChange}
                        name="coverImage"
                    />
                </Box>
                <Box mb={4}>
                    <Text mb={1} as="label">
                        Genre
                    </Text>
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
                    <Text mb={1} as="label">
                        Rating : {moviedata.rating}
                    </Text>
                    <Slider
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
                    <Text mb={1} as="label">
                        Review
                    </Text>
                    <Textarea
                        value={moviedata.review}
                        onChange={handleChange}
                        placeholder="Your review about the movie"
                        size="sm"
                        name="review"
                    />
                </Box>
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
