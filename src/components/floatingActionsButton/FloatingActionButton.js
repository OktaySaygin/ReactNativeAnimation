import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import React, {forwardRef, useImperativeHandle} from 'react';
import {Circle, Defs, LinearGradient, Stop, Svg} from 'react-native-svg';

import {CIRCLE_SIZE, ICON_SIZE} from './data';
import {getAnimatedStyles} from './animatedStyles';
import FastImage from "react-native-fast-image";

const AnimatedIcon = Animated.createAnimatedComponent(View);

const FloatingActionButton = forwardRef(({progress, onPress}, ref) => {
    const {send, close} = getAnimatedStyles(progress);

    useImperativeHandle(ref, () => ({
      close: onPress,
    }));

    return (
      <View onTouchStart={onPress} style={styles.container}>
        <Svg height={`${CIRCLE_SIZE}`} width={`${CIRCLE_SIZE}`}>
          <Defs>
            <LinearGradient id="button" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="40%" stopColor="#f45371" />
                <Stop offset="100%" stopColor="#ed4c94" />
            </LinearGradient>
          </Defs>
          <Circle
            cx={`${CIRCLE_SIZE / 2}`}
            cy={`${CIRCLE_SIZE / 2}`}
            r={`${CIRCLE_SIZE / 2}`}
            fill="url(#button)"
          />
        </Svg>
          <AnimatedIcon style={[send, styles.sendIcon]}>
              <FastImage
                source={require('../../assets/white/sent.png')}
                style={{width: 40, aspectRatio: 1}}
              />
          </AnimatedIcon>
          <AnimatedIcon style={[close, styles.closeIcon]}>
            <FastImage
              source={require('../../assets/black/close.png')}
              style={{width: 40, aspectRatio: 1}}
            />
          </AnimatedIcon>
      </View>
    );
    }
);

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    zIndex: 1,
  },
  sendIcon: {
    right: 19,
    top: 18,
    position: 'absolute',
  },
  closeIcon: {
    right: 16,
    top: 17,
    position: 'absolute',
  },
});
