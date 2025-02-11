import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import Container from '../navigation/Container';
import Carousel from '../components/3DCarousel';


function Search(props) {
    const [data, setData] = React.useState([]);

    useEffect( () => {
        fetchData().then((res) => {
            setData(res);
        });

    },[]);

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8080/amazonData/bestseller");
            return await response.json();
        } catch (error) {
            console.error(error.message);
        }
    }

    if (data?.length <= 0) {
        return (
            <ActivityIndicator/>
        )
    }

    const renderItem = ({item, index}) => {
      return (
          <Carousel item={item}/>
      )
    }

    return (
        <Container>
            <View style={styles.container}>
                <FlatList data={data} renderItem={renderItem} keyExtractor={item => item?.index?.toString()}/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Search;
