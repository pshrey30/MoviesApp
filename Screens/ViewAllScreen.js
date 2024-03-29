import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '../Themes/Index';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../Components/MovieList';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-5'

const ViewAllScreen = ({ title }) => {
    const navigation = useNavigation();
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
                <View className="flex-row justify-between items-center">
                    <Text
                        className="pb-1 pl-6 flex-1 text-left text-2xl font-semibold text-white tracking-wider"
                    >
                        {title}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ViewAllScreen;