import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import switchTheme from 'react-native-theme-switch-animation';
import {useAuth} from '../navigation/AuthContext';
import Container from '../navigation/Container';

function Explore({ navigation }) {
    const [activeCircle, setActiveCircle] = useState(1);
    const circle1Progress = useSharedValue(0);
    const circle2Progress = useSharedValue(0);
    const { theme, setTheme } = useAuth(); // AuthContext'ten theme ve setTheme alınıyor

    const toggleTheme = () => {
        setTheme('dark');
    };

    const animateCircle = (circleNumber) => {
        if (circleNumber === 1) {
            circle1Progress.value = withTiming(1, { duration: 1000 });
            circle2Progress.value = withTiming(0, { duration: 1000 });
        } else {
            circle2Progress.value = withTiming(1, { duration: 1000 });
            circle1Progress.value = withTiming(0, { duration: 1000 });
        }
    };

    const circle1Style = useAnimatedStyle(() => ({
        width: interpolate(
            circle1Progress.value,
            [0, 1],
            [0, 100],
            Extrapolation.CLAMP
        ),
        opacity: interpolate(
            circle1Progress.value,
            [0, 1],
            [0.3, 1],
            Extrapolation.CLAMP
        )
    }));

    const circle2Style = useAnimatedStyle(() => ({
        width: interpolate(
            circle2Progress.value,
            [0, 1],
            [0, 100],
            Extrapolation.CLAMP
        ),
        opacity: interpolate(
            circle2Progress.value,
            [0, 1],
            [0.3, 1],
            Extrapolation.CLAMP
        )
    }));

    return (
        <Container>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{width: 30, height: 20, backgroundColor: 'red'}}
                    onPress={() => {
                        // setActiveCircle(1);
                        // animateCircle(1);
                        // toggleTheme();
                        switchTheme({
                            switchThemeFunction: () => {
                                setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
                            },
                            animationConfig: {
                                type: 'circular',
                                duration: 900,
                                startingPoint: {
                                    cxRatio: 0.44,
                                    cyRatio: 0.55
                                }
                            },
                            // animationConfig: {
                            //     type: 'fade',
                            //     duration: 1000,
                            // },
                        });
                    }}
                >
                    <Animated.View
                        style={[styles.circle, styles.circle1, circle1Style]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{width: 30, height: 20, backgroundColor: 'green'}}

                    onPress={() => {
                        // setActiveCircle(2);
                        // animateCircle(2);

                        switchTheme({
                            switchThemeFunction: () => {
                                setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
                            },
                            animationConfig: {
                                type: 'fade',
                                duration: 1000,
                            },
                        });
                    }}
                >
                    <Animated.View
                        style={[styles.circle, styles.circle2, circle2Style]}
                    />
                </TouchableOpacity>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    circle: {
        height: 100,
        borderRadius: 50,
    },
    circle1: {
        backgroundColor: 'blue'
    },
    circle2: {
        backgroundColor: 'red'
    }
});
export default Explore;
