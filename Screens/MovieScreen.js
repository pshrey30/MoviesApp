import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { Styles, theme } from '../Themes/Index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../Components/Cast';
import MovieList from '../Components/MovieList';
import Loading from '../Components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../Api/MoviesDb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
    let movieName = "Avengers:Endgame"
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFav, setIsFav] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        //console.log("item id: ", item.id)
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        //console.log("get movie details: ", data)
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        //console.log("get credits: ", data);
        if (data && data.cast) setCast(data.cast)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        //console.log('get similar movies: ', data)
        if (data && data.results) setSimilarMovies(data.results)
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            {/* Back Button and movie poster here */}
            <View className="w-full">
                <SafeAreaView
                    className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={Styles.background}
                        className="rounded-xl p-1"
                    >
                        <ChevronLeftIcon size='24' strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFav(!isFav)}>
                        <HeartIcon size="30" color={isFav ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require("../assets/Images/ironman2.jpg")}
                                source={{ uri: image500(movie?.poster_path) }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width: width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        </View>
                    )
                }
            </View>
            {/* Movie Details */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* Title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie?.title
                    }
                </Text>
                {/* status, release, runtime */}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime}min
                        </Text>
                    )
                        : null
                }
                {/* Genre */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? '•' : null}
                                </Text>
                            )
                        })
                    }
                    {/* <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action -
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thriller -
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text> */}
                </View>
                {/* Description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>
            </View>
            {/* Cast */}
            {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

            {/* Similar Movies */}
            {similarMovies.length > 0 && <MovieList title="Simliar Movies" hideseeAll={true} data={similarMovies} />}
        </ScrollView>
    )
}

export default MovieScreen;