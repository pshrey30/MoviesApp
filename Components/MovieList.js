import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Styles } from '../Themes/Index'
import { useNavigation } from '@react-navigation/native'
import { image185 } from '../Api/MoviesDb';

var { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideseeAll }) => {
    //let movieName = "Avengers:Endgame"
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {/* {
                    !hideseeAll && (
                        <TouchableOpacity onPress={() => navigation.navigate('ViewAll')}>
                            <Text style={Styles.text} className="text-lg">View All</Text>
                        </TouchableOpacity>
                    )
                } */}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        //source={require("../assets/Images/ironman.jpg")}
                                        source={{ uri: image185(item.poster_path) }}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title
                                        }
                                    </Text>
                                </View>

                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default MovieList;