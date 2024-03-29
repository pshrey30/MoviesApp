import { View, Text, TextInput, Platform, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { Styles } from '../Themes/Index';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Components/Loading';
import { image185, searchMovie } from '../Api/MoviesDb';
import { debounce } from 'lodash';


var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-5'

const SearchScreen = () => {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false)

    let movieName = "Spiderman : No Way Home"

    const handleSearch = value => {
        // console.log('value: ', value)
        if (value && value.length > 2) {
            setLoading(true)
            searchMovie({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                //console.log('get movie: ', data);
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <View
                className={"z-20 w-full flex-row justify-between items-center px-5 " + topMargin}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={Styles.background}
                    className="rounded-xl p-1"
                >
                    <ChevronLeftIcon size='24' strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <View className="mx-5 flex-row justify-between items-center border border-neutral-500 rounded-full">
                    <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder='Search Movie'
                        placeholderTextColor={'lightgray'}
                        className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                    >
                    </TextInput>
                </View>
            </View>

            {/* Results */}
            {
                loading ? (
                    <Loading />
                ) :
                    results.length > 0 ? (

                        <ScrollView
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="space-y-3 mt-4"
                        >
                            <Text className="text-white font-semibold ml-1">Results  [{results.length}]</Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View className="space-y-2 mb-4">
                                                    <Image
                                                        className="rounded-3xl"
                                                        // source={require('../assets/Images/Spidy.jpg')}
                                                        source={{ uri: image185(item?.poster_path) }}
                                                        style={{ width: width * 0.44, height: height * 0.3 }}
                                                    />
                                                    <Text className="text-neutral-300 ml-1">
                                                        {
                                                            item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className='flex-row justify-center mt-12'>
                            <Image source={require('../assets/Images/empty.png')}
                                className="h-96 w-96"
                            />
                        </View>
                    )
            }

        </SafeAreaView>
    )
}

export default SearchScreen;