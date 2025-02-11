import React, {useState} from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet, LayoutChangeEvent} from 'react-native';

import {ACTIONS, INITIAL_DIMENSIONS} from './data';
import {getAnimatedContainerStyles} from './animatedStyles';
import FloatingActionModalItem from './FloatingActionModalItem';

const FloatingActionModal = (props) => {
  const [dimensions, setDimensions] = useState(INITIAL_DIMENSIONS);

  const onLayout = (e) => {
    if (dimensions.height === 0) {
      setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
      });
    }
  };

  const {animatedContainer} = getAnimatedContainerStyles(dimensions, props?.progress);

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, animatedContainer, props?.style]}>
      {ACTIONS.map((action, key) => (
        <FloatingActionModalItem
          key={`action-${key}`}
          item={action}
          progress={props?.progress}
          style={[
            styles.itemContainer,
            key === 0
              ? styles.firstItem
              : key === ACTIONS.length - 1
              ? styles.lastItem
              : {},
          ]}
        />
      ))}
    </Animated.View>
  );
};

export default FloatingActionModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff94f1',
  },
  itemContainer: {
    paddingHorizontal: 32,
    paddingVertical: 19,
  },
  firstItem: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  lastItem: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
