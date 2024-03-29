import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { Styles } from '../Themes/Index';
import TrendingMovies from '../Components/TrendingMovies';
import MovieList from '../Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../Api/MoviesDb';

const ios = Platform.OS == "ios";
const android = Platform.OS == "android";
const HomeScreen = () => {
    const navigation = useNavigation();
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        //console.log('get trending: ', data);
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        //console.log('get Upcoming: ', data);
        if (data && data.results) setUpcoming(data.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        //console.log('get Top Rated: ', data);
        if (data && data.results) setTopRated(data.results)
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* Search bar and Logo */}
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style='light' />
                <View className="flex-row justify-between items-center mx-4 mt-3">
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                    <Text
                        className="text-white text-3xl font-bold">
                        <Text style={Styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {/* Trending Movies Carousel */}
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        {/* Upcoming Movies Carousel */}
                        <MovieList title="Upcoming" data={upcoming} />

                        {/* Top Rated Movies Carousel */}
                        <MovieList title="Top Rated" data={topRated} />
                    </ScrollView>
                )
            }
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    // text: {
    //     color: "#eab308"
    // }
})