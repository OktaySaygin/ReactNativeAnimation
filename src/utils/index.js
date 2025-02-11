import {Dimensions, Platform} from 'react-native';

export const typography = {
    semiBold: 'Montserrat-SemiBold',
    regular: 'Montserrat-Regular',
    light: 'Montserrat-Light',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
};

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const MAX_FONT_UPSCALE_FACTOR = IS_IOS ? 1.5 : 1.3;
export const MED_FONT_UPSCALE_FACTOR = IS_IOS ? 1.3 : 1.15;
export const SM_FONT_UPSCALE_FACTOR = IS_IOS ? 1.2 : 1.1;
export const XSM_FONT_UPSCALE_FACTOR = IS_IOS ? 1.1 : 1.05;
