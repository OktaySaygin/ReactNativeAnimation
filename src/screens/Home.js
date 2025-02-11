import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Container from '../navigation/Container';
import FloatingActionModal from '../components/floatingActionsButton/FloatingActionModal';
import {cancelAnimation, useSharedValue, withTiming} from 'react-native-reanimated';
import FloatingActionButton from '../components/floatingActionsButton/FloatingActionButton';

function Home({ navigation }) {
    const floatingRef = useRef(null);
    const progress = useSharedValue(0);

    const animate = () => {
        if (progress.value === 0) {
            progress.value = withTiming(0.5, {duration: 750});
        } else if (progress.value === 0.5) {
            progress.value = withTiming(1, {duration: 500}, finished => {
                if (finished) {
                    progress.value = 0;
                }
            });
        } else {
            cancelAnimation(progress);
            progress.value = withTiming(0, {duration: 500});
        }
    };

    const onTouchOut = () => {
        if (progress.value > 0) {
            floatingRef.current?.close();
        }
    };

    return (
        <Container>
            <View style={styles.container} onTouchStart={onTouchOut}>
                <View style={styles.buttonPosition}>
                    <View style={styles.buttonContainer}>
            <FloatingActionButton
                ref={floatingRef}
                progress={progress}
                onPress={animate}
            />
            <FloatingActionModal progress={progress} style={styles.absolute} />
                    </View>
                </View>
            </View>
        </Container>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecc1c3',
    },
    buttonPosition: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        bottom: 100,
        right: 24,
        alignItems: 'flex-end',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    absolute: {
        position: 'absolute',
    },
});
