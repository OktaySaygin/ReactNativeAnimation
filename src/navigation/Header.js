import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useAuth} from './AuthContext';
import {useNavigation} from '@react-navigation/native';

function Header() {
    const {theme} = useAuth();

    const mode = theme === 'light' ? 'white' : 'black'

    return (
        <View style={{width: '100%', height: 62, backgroundColor: theme === 'light' ? 'white' : 'black', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20,
            shadowOpacity: 0.4, shadowColor: theme === 'light' ? 'gray' : 'black', shadowOffset: {width: 4, height: 4},elevation: 6 }}>
            <View style={{flexDirection: 'row', flex: 0.5}}>
                <FastImage
                    source={require('../assets/icons/avatar.png')}
                    style={{width: 42, aspectRatio: 1, borderRadius: 42, marginRight: 10}}
                />
                <View style={{justifyContent: 'center'}}>
                    <Text style={{color: theme === 'light' ? 'black' : 'white', fontSize: 16, fontWeight: 'bold'}}>Köfterium</Text>
                    <Text style={{color: theme === 'light' ? 'black' : 'white'}}>Oktay Saygın</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{padding: 10, backgroundColor: theme === 'light' ? '#ececec' : '#202020', borderRadius: 40, marginRight: 10}}>
                    <FastImage
                        source={theme === 'light' ? require('../assets/black/plus.png') : require('../assets/white/plus.png')}
                        style={{width: 26, aspectRatio: 1}}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{padding: 10, backgroundColor: theme === 'light' ? '#ececec' : '#202020', borderRadius: 40}}>
                    <FastImage
                        source={theme === 'light' ? require('../assets/black/dots.png') : require('../assets/white/dots.png')}
                        style={{width: 26, aspectRatio: 1}}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Header;
