import React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconDiscover({ inStrokeColor = '#000000', outStrokeColor = '#000000', fill = "none", darkMode = false }) {
    return (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M27.5 15C27.5 8.09644 21.9035 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9035 8.09644 27.5 15 27.5C21.9035 27.5 27.5 21.9035 27.5 15Z"
                stroke={outStrokeColor} strokeWidth="2" fill={fill}/>
            <Path
                d="M15.5018 10.3725L19.1516 9.15581C20.2594 8.78655 20.8134 8.60191 21.1058 8.8943C21.3981 9.18669 21.2135 9.74059 20.8441 10.8484L19.6275 14.4983C18.9983 16.386 18.6836 17.3299 18.0068 18.0068C17.3299 18.6836 16.386 18.9983 14.4983 19.6275L10.8484 20.8441C9.74059 21.2135 9.18669 21.3981 8.8943 21.1058C8.60191 20.8134 8.78655 20.2594 9.15581 19.1516L10.3725 15.5018C11.0017 13.614 11.3163 12.6701 11.9932 11.9932C12.6701 11.3163 13.614 11.0017 15.5018 10.3725Z"
                stroke={inStrokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill={darkMode ? 'black' : 'white'}/>
            <Path d="M14.9999 15L14.9919 15.008" stroke={inStrokeColor} strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </Svg>
    );
}

export default IconDiscover;
