import React, { useRef } from 'react';
import {
    View,
    Animated,
    FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native';
import HeroCard from './HeroCard';
import { Spacing } from '../../styles/tripTheme';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.75;
const SPACING = -30; // overlap
const SNAP_INTERVAL = CARD_WIDTH + SPACING;



const DATA = [
    {
        id: '2',
        country: 'Brazil',
        city: 'Amazon',
        rating: '4.8',
        reviews: '98 reviews',
        image: require('../../assets/images/mountain2.jpg'),
    },
    {
        id: '1',
        country: 'Brazil',
        city: 'Rio de Janeiro',
        rating: '5.0',
        reviews: '143 reviews',
        image: require('../../assets/images/mountain.jpg'),
    },
    {
        id: '3',
        country: 'Brazil',
        city: 'Sunset Hills',
        rating: '4.9',
        reviews: '120 reviews',
        image: require('../../assets/images/sunset.jpg'),
    },
];

const HeroCarousel = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const listRef = useRef(null);

    return (
        <Animated.FlatList
            ref={listRef}
            data={DATA}
            horizontal
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            // contentOffset={{ x: SNAP_INTERVAL / 2 - SPACING, y: 0 }}
            contentContainerStyle={{
                paddingHorizontal:
                    (width - CARD_WIDTH) / 2 + Math.abs(SPACING) / 2,
            }}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
                const inputRange = [
                    (index - 1) * SNAP_INTERVAL,
                    index * SNAP_INTERVAL,
                    (index + 1) * SNAP_INTERVAL,
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.9, 1, 0.9],
                    extrapolate: 'clamp',
                });

                const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: [30, 0, 30],
                    extrapolate: 'clamp',
                });

                const zIndex = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 10, 0],
                    extrapolate: 'clamp',
                });

                const elevation = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 10, 0],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={{
                            marginRight: SPACING,
                            transform: [{ scale }, { translateY }],
                            zIndex,          
                            elevation,       
                        }}
                    >
                        <HeroCard item={item} />
                    </Animated.View>
                );
            }}

        />
    );
};

export default HeroCarousel;
