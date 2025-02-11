import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Container from '../navigation/Container';
import Carousel from '../components/3DCarousel';
import {DATA, SPACING} from '../components/fadeItemList/constants';
import {FlashList} from '@shopify/flash-list';
import {useSharedValue} from 'react-native-reanimated';
import FadeListItem from '../components/fadeItemList/FadeListItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WIDTH} from '../utils';

function Message(props) {
    const [data, setData] = React.useState([]);
    const scrollY = useSharedValue(0);
    const [text, onChangeText] = React.useState('Rubik');


    useEffect( () => {
        fetchData().then((res) => {
            setData(res);
        });
    },[text]);

    async function fetchData() {
        if (text.length >= 2) {
            try {
                const response = await fetch("http://localhost:8080/amazonData/search/" + text);
                return await response.json();
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    if (data?.length <= 0) {
        return (
            <ActivityIndicator/>
        )
    }

    const renderItem = ({item, index}) => (
        <FadeListItem item={item} index={index} scrollY={scrollY} />
    );

    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Search...'
                        onChangeText={onChangeText}
                        value={text}
                        style={styles.input}
                    />
                </View>

                <FlashList
                    data={data}
                    onScroll={e => {
                        scrollY.value = e.nativeEvent.contentOffset.y;
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 30,
                        paddingHorizontal: SPACING,
                        paddingBottom: 2 * SPACING,
                    }}
                    estimatedItemSize={118}
                    ItemSeparatorComponent={() => <View style={{height: SPACING}} />}
                    keyExtractor={(item, index) => item?.asin?.toString() + index.toString()}
                    renderItem={renderItem}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatlistContainer: {
        paddingHorizontal: SPACING,
    },
    inputContainer: {
        width: WIDTH,
        height: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        height: 40,
        width: WIDTH - 60,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10
    }
});
export default Message;
