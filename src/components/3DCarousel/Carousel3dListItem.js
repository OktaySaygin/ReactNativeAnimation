import React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import {WIDTH} from '../../utils';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from './constants';
import FastImage from 'react-native-fast-image';


const Carousel3dListItem = ({item, index, scrollX}) => {
    const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];

    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
    });

    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [50, 0, 20],
    });

    return (
        <Animated.View
            style={[styles.container, {opacity, transform: [{translateY}]}]}>
            <FastImage source={{uri: item.image}} style={styles.image} />
        </Animated.View>
    );
};

export default Carousel3dListItem;

const styles = StyleSheet.create({
    container: {
        zIndex: 99,
        width: WIDTH,
        alignItems: 'center'
        // paddingVertical: SPACING,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',
    },
});
