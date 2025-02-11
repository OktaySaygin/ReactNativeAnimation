import Animated, {
    interpolate,
    Extrapolation,
    useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AVATAR_SIZE, ITEM_SIZE, SPACING} from './constants';
import {WIDTH} from '../../utils';
import StarRating from 'react-native-star-rating-widget';
import FastImage from 'react-native-fast-image';

const FadeListItem = ({item, index, scrollY}) => {
    let temp = item.rating.slice(" ");
    const [rating, setRating] = useState(parseFloat(temp[0] + temp[1] + temp[2]));

    const inputRange = [
        -1,
        0,
        (ITEM_SIZE + 8) * index,
        (ITEM_SIZE + 8) * (index + 2),
    ];

    const opacityInputRange = [
        -1,
        0,
        (ITEM_SIZE + 8) * index,
        (ITEM_SIZE + 8) * (index + 1),
    ];

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, opacityInputRange, [1, 1, 1, 0]),
        transform: [
            {
                scale: interpolate(
                    scrollY.value,
                    inputRange,
                    [1, 1, 1, 0],
                    Extrapolation.CLAMP,
                ),
            },
        ],
    }));

    return (
        <Animated.View style={[styles.parentViewItem, animatedStyle]}>
            <Text style={{position: 'absolute', fontSize: 12, color: 'orange', left: 5, top: 2}}>{item.amazonChoice ? 'AmazonChoice' : item.bestSeller ? 'BestSeller' : ''}</Text>
            <FastImage source={{uri: item.image}} style={styles.image} resizeMode={'contain'} />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                        starSize={16}
                        rating={rating}
                        onChange={setRating}
                    />
                    <Text style={{fontSize: 10}}>{item.countReview}</Text>
                </View>

                <Text style={styles.price}>
                    {item.price}
                </Text>
                {/*<Text style={styles.email} allowFontScaling={false}>*/}
                {/*    {item.email}*/}
                {/*</Text>*/}
            </View>
        </Animated.View>
    );
};

export default FadeListItem;

const styles = StyleSheet.create({
    parentViewItem: {
        height: 118,
        flexDirection: 'row',
        padding: SPACING,
        borderRadius: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 3,
    },
    image: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        marginRight: SPACING / 2,
    },
    textContainer: {
        width: WIDTH - 2 * SPACING - SPACING - AVATAR_SIZE - SPACING,
        justifyContent: 'space-between',
        flex: 1,
        height: '100%'
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    price: {
        fontSize: 16,
        opacity: 0.7,
        color: 'black',
    },
    email: {
        opacity: 0.8,
        color: '#0099cc',
    },
});
