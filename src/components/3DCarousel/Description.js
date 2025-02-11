import React, {useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

import Content from './Content';
import {IMAGE_WIDTH, SPACING} from './constants';
import {WIDTH} from '../../utils';

const Description = (props) => {
    return (
        <View style={styles.container}>
            {props?.items?.map((item, index) => {
                const inputRange = [
                    (index - 0.2) * WIDTH,
                    index * WIDTH,
                    (index + 0.2) * WIDTH,
                ];

                const opacity = props?.scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                });

                const rotateY = props?.scrollX.interpolate({
                    inputRange,
                    outputRange: ['-45deg', '0deg', '45deg'],
                });

                return (
                    <Animated.View
                        key={index?.toString()}
                        style={[
                            styles.itemContainer,
                            {opacity, transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY}]},
                        ]}>
                        <Content {...item} />
                    </Animated.View>
                );
            })}
        </View>
    );
};

export default Description;

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 140,
        zIndex: 100,
        alignItems: 'center'
    },
    itemContainer: {
        position: 'absolute',
        backfaceVisibility: 'visible',
    },
});
