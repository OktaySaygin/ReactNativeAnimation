import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IMAGE_WIDTH, SPACING} from './constants';
import StarRating from 'react-native-star-rating-widget';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {openLink} from '../../navigation/NavigationService';


const Content = (item) => {
    let temp = item.rating.slice(" ");
    const [rating, setRating] = useState(parseFloat(temp[0] + temp[1] + temp[2]));

    return (
        <View style={styles.textContainer}>
            <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
            </Text>
            <View style={[styles.linkContainer]}>
                <StarRating
                    starSize={24}
                    rating={rating}
                    onChange={setRating}
                />
                <TouchableOpacity onPress={() => {
                    openLink("https://www.amazon.com" +item.link)
                }}>
                    <FastImage
                        source={require('../../assets/icons/link.png')}
                        style={{width: 24, aspectRatio: 1}}
                    />
                </TouchableOpacity>

            </View>

            <Text style={styles.price}>
                {item.price}
            </Text>
        </View>
    );
};

export default Content;

const styles = StyleSheet.create({
    textContainer: {
        width: IMAGE_WIDTH + SPACING * 2,
        paddingHorizontal: 10,
        height: 140,
        justifyContent: 'space-evenly',
    },
    itemTitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        alignSelf: 'flex-end',
        color: 'white',
        fontSize: 26,
    },
});
