import React from 'react';
import Animated from 'react-native-reanimated';
import {Pressable, StyleSheet} from 'react-native';
import {getAnimatedItemStyles} from './animatedStyles';
import {MAX_FONT_UPSCALE_FACTOR, typography} from "../../utils";

const FloatingActionModalItem = (props) => {
  const Icon = Animated.createAnimatedComponent(props?.item.component);

  const {animatedIcon, animatedText} = getAnimatedItemStyles(props?.progress);

  return (
    <Pressable
      onPress={() => {
        if (props?.progress.value === 0) {
          return;
        }

        //On item press action
      }}
      style={({pressed}) => [
        pressed && props?.progress.value !== 0 && styles.touch,
        styles.itemContainer,
          props?.style,
      ]}>
      <Icon name={props?.item.name} color={'white'} size={24} style={animatedIcon} />
      <Animated.Text
        maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}
        style={[styles.label, animatedText]}>
        {props?.item.label}
      </Animated.Text>
    </Pressable>
  );
};

export default FloatingActionModalItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontFamily: typography.semiBold,
  },
  touch: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
});
