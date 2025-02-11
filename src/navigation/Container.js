import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useAuth} from './AuthContext';

const Container = (props) => {
    const { theme, setTheme } = useAuth(); // AuthContext'ten theme ve setTheme alınıyor


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme === 'light' ? '#f3f3f3' : '#202020', marginBottom: 40}}>
            <View style={[[props.style],{flex: 1}]}>
                {props.children}
            </View>
        </SafeAreaView>
    );
}

export default React.memo(Container)
