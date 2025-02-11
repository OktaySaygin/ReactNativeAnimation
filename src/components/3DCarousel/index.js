import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {WIDTH} from '../../utils';
import Carousel3dListItem from './Carousel3dListItem';
import Description from './Description';
import Background from './Background';
import {IMAGE_HEIGHT, IMAGE_WIDTH, SPACING} from './constants';

function Carousel(props) {
    const listRef = React.useRef(null);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const progress = Animated.modulo(Animated.divide(scrollX, WIDTH), WIDTH);

    const onScroll = Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollX}}}],
        {useNativeDriver: true},
    );

    const renderListItem = (item, index, scrollX,) => <Carousel3dListItem item={item} index={index} scrollX={scrollX} />;

    return (
        <View style={{marginBottom: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.item.categories}</Text>
            <Animated.FlatList
                ref={listRef}
                data={props.item.items}
                keyExtractor={(item,index) => index.toString()}
                horizontal
                pagingEnabled
                bounces={false}
                onScroll={onScroll}
                style={styles.list}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) =>
                    renderListItem(item, index, scrollX)
                }
            />
            <Description scrollX={scrollX} items={props.item.items} />
            <View style={[styles.card]}>
                <Background progress={progress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    listContainer: {
        height: IMAGE_HEIGHT * 2.1,
        alignItems: 'center',

    },
    list: {
        flexGrow: 0,
        zIndex: 1000,

    },
    card: {
        width: IMAGE_WIDTH + SPACING * 2,
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        bottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 0,
        }
    },
});

export default Carousel;
