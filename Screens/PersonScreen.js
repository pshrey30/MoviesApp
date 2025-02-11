import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Styles } from '../Themes/Index';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../Components/MovieList';
import Loading from '../Components/Loading';
import { fetchPersonDetails, fetchPersonMovie, image342 } from '../Api/MoviesDb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'mb-3';
const PersonScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFav, setIsFav] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        //console.log('perosn', item);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        // console.log('perosn details: ', data);
        if (data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovie(id);
        //console.log('perosn details: ', data);
        if (data && data.cast) setPersonMovies(data.cast);
    }
    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>

            {/* Back button and Heart Icon */}
            <SafeAreaView
                className={"z-20 w-full flex-row justify-between items-center px-4 mt-3 " + verticalMargin}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={Styles.background}
                    className="rounded-xl p-1"
                >
                    <ChevronLeftIcon size='24' strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFav(!isFav)}>
                    <HeartIcon size="30" color={isFav ? 'red' : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Person Details */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View
                            className="flex-row justify-center"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}
                        >
                            <View
                                className="overflow-hidden rounded-full h-72 w-72 items-center border-2 border-neutral-500">
                                <Image
                                    //source={require("../assets/Images/robert.jpg")}
                                    source={{ uri: image342(person?.profile_path) }}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                >
                                </Image>
                            </View>
                        </View>
                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {
                                    person?.name
                                }
                            </Text>
                            <Text className="text-base text-neutral-500 text-center">
                                {
                                    person?.place_of_birth
                                }
                            </Text>
                        </View>
                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.gender == 1 ? 'female' : 'male'
                                    }
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthdate</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.birthday
                                    }
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.known_for_department
                                    }
                                </Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.popularity?.toFixed(2)
                                    }%
                                </Text>
                            </View>
                        </View>
                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {
                                    person?.biography || 'NA'
                                }
                            </Text>
                        </View>

                        {/* Movies done */}
                        <MovieList title='Movies' hideseeAll={true} data={personMovies} />
                    </View>
                )
            }
        </ScrollView>
    )
}

export default PersonScreen;