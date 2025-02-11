import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useAuth} from './AuthContext';
import Search from '../assets/svg/search.svg';
import Message from '../assets/svg/discover.svg';
import Profile from '../assets/svg/user.svg';
import Explore from '../assets/svg/sent.svg';
import Home from '../assets/svg/home.svg';
import IconHome from '../assets/svg/IconHome';
import IconSearch from '../assets/svg/IconSearch';
import IconDiscover from '../assets/svg/IconDiscover';
import IconMessage from '../assets/svg/IconMessage';
import IconProfile from '../assets/svg/IconProfile';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;
const CURVE_HEIGHT = 20;


const TabBar = ({ state, descriptors, navigation }) => {
    const imageScales = state.routes.map(() => useSharedValue(1));
    const marginTop = state.routes.map(() => useSharedValue(0));

    const {theme} = useAuth();

    const createPath = () => {
        const tabCenter = TAB_WIDTH / 2;

        return `
      M 0 0
      L ${tabCenter - 35} 0
      C ${tabCenter - 24} 0 ${tabCenter - 24} ${CURVE_HEIGHT} ${tabCenter} ${CURVE_HEIGHT}
      C ${tabCenter + 24} ${CURVE_HEIGHT} ${tabCenter + 24} 0 ${tabCenter + 35} 0
      L ${TAB_WIDTH} 0
      L ${TAB_WIDTH} 60
      L 0 60
      Z
    `;
    };

    const AnimatedSvg = Animated.createAnimatedComponent(Svg);
    const AnimatedView = Animated.createAnimatedComponent(View);
    const method = {
        Home: (props) => <IconHome {...props} />,
        Search: (props) => <IconSearch {...props} />,
        Explore: (props) => <IconDiscover {...props} />,
        Message: (props) => <IconMessage {...props} />,
        Profile: (props) => <IconProfile {...props} />,
    };


    const source = (name) => {
        const icons = {
            light: {
                Home: require('../assets/black/home.png'),
                Search: require('../assets/black/search.png'),
                Explore: require('../assets/black/discover.png'),
                Message: require('../assets/black/sent.png'),
                Profile: require('../assets/black/user.png'),
            },
            dark: {
                Home: require('../assets/white/home.png'),
                Search: require('../assets/white/search.png'),
                Explore: require('../assets/white/discover.png'),
                Message: require('../assets/white/sent.png'),
                Profile: require('../assets/white/user.png'),
            },
        };

        // theme ve name'e göre doğru ikonu döndür
        return icons[theme][name] || null;
    };

    const source2 = (name) => {
        const icons = {
            dark: {
                Home: require('../assets/black/home.png'),
                Search: require('../assets/black/search.png'),
                Explore: require('../assets/black/discover.png'),
                Message: require('../assets/black/sent.png'),
                Profile: require('../assets/black/user.png'),
            },
            light: {
                Home: require('../assets/white/home.png'),
                Search: require('../assets/white/search.png'),
                Explore: require('../assets/white/discover.png'),
                Message: require('../assets/white/sent.png'),
                Profile: require('../assets/white/user.png'),
            },
        };

        // theme ve name'e göre doğru ikonu döndür
        return icons[theme][name] || null;
    };

    return (
        <View style={styles.container}>
            <View style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
                <AnimatedSvg
                    width={'100%'}
                    height={60}
                    // style={[{ width: '100%' }]}
                >
                    {state.routes.map((_, index) => (
                        <Path
                            key={index}
                            d={createPath()}
                            fill={theme === 'light' ? "#fff" : "black"}
                            transform={`translate(${index * TAB_WIDTH}, 0)`}
                        />
                    ))}
                </AnimatedSvg>
            </View>

            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const Icon = method[route.name];

                    // Animate scale when focused
                    React.useEffect(() => {
                        imageScales[index].value = withTiming(isFocused ? 1.4 : 1, { duration: 400 });
                        marginTop[index].value = withTiming(isFocused ? -CURVE_HEIGHT * 5 : 0, { duration: 400 });
                    }, [isFocused, theme]);

                    const imageStyle = useAnimatedStyle(() => ({
                        // marginTop: isFocused ? -CURVE_HEIGHT * 5 : 0,
                        marginTop: marginTop[index].value,
                        transform: [{
                            scale: imageScales[index].value
                        }],

                    }));

                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={route.key}
                            onPress={() => {
                                navigation.navigate(route.name);
                            }}
                            style={{
                                flex: 1,
                                backgroundColor: isFocused ? 'rgba(255,255,255,0)' : theme === 'light' ? 'white' : 'black',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <AnimatedView
                                style={[
                                    {
                                        width: 40,
                                        aspectRatio: 1,
                                        backgroundColor: theme === 'light' ?  'white' : 'black',
                                        borderRadius: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    imageStyle
                                ]}
                            >
                                {/*<FastImage*/}
                                {/*    source={isFocused ? source2(route.name) : source(route.name)}*/}
                                {/*    style={{width: 28, aspectRatio: 1, backgroundColor: 'red'}}*/}
                                {/*/>*/}
                                {/*<View>*/}
                                {/*    <Icon width={30} height={30} stroke="#FF0000" />*/}
                                {/*</View>*/}
                                {theme === 'light' && <Icon inStrokeColor={'black'} outStrokeColor={isFocused ? 'white' : 'black'} fill={isFocused ?  'black' : 'white'} darkMode={false} />}
                                {theme === 'dark' && <Icon inStrokeColor={'white'} outStrokeColor={isFocused ? 'black' : 'white'} fill={isFocused ?  'white' : 'black'} darkMode={true}/>}
                            </AnimatedView>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        height: 60,
        backgroundColor: 'transparent',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    tabContainer: {
        flexDirection: 'row',
        height: '100%',
    },
});

export default TabBar;
