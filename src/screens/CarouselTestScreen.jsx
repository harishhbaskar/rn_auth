import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import ScreenWrapper from '../components/common/ScreenWrapper';
import { Colors, Fonts } from '../styles/globalStyles';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.65; 
const SPACER = (width - ITEM_WIDTH) / 2;

const DATA = [
    { id: '1', title: 'Renter', desc: 'Find your preferences here by exploring our unlimited resources', img: require('../assets/images/renter.jpg') },
    { id: '2', title: 'My Home', desc: 'Find your preferences here by exploring our unlimited resources', img: require('../assets/images/myhome.jpg') },
    { id: '3', title: 'Seller', desc: 'Welcom back start to manage your property from anywhere in the world', img: require('../assets/images/seller.png') },
];

const SlidingCard = ({ item, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [0, -40, 0], 
      Extrapolation.CLAMP
    );

    
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.98, 1, 0.98],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5], 
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      
      <Image source={item.img} style={styles.image} />
      <View style={styles.textDetails}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
      </View>
    </Animated.View>
  );
};

const PaginationDots = ({ data, scrollX }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          
          const dotWidth = interpolate(
            scrollX.value,
            inputRange,
            [8, 20, 8],
            Extrapolation.CLAMP
          );

          
          const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolation.CLAMP
          );

          return {
            width: dotWidth,
            opacity,
          };
        });

        return (
          <Animated.View 
            key={index} 
            style={[styles.dot, animatedDotStyle]} 
          />
        );
      })}
    </View>
  );
};

export default function CarouselTestScreen() {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <ScreenWrapper noPadding>
      <View style={styles.mainContainer}>
        <Animated.FlatList
          data={DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ 
            paddingHorizontal: SPACER,
            alignItems: 'center',
            paddingTop: 100 
          }}
          renderItem={({ item, index }) => (
            <SlidingCard item={item} index={index} scrollX={scrollX} />
          )}
        />
        <PaginationDots data={DATA} scrollX={scrollX} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    position: 'relative', 
  },
  cardContainer: { 
    width: ITEM_WIDTH, 
    alignItems: 'center',
  },
  image: { 
    width: ITEM_WIDTH * 0.8, 
    height: ITEM_WIDTH * 1.1, 
    borderRadius: 30, 
  },
  textDetails: { 
    marginTop: 25, 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  cardTitle: { 
    fontSize: 22, 
    fontFamily: Fonts.bold, 
    color: Colors.textPrimary,
    marginBottom: 10
  },
  cardDesc: { 
    fontSize: 14, 
    color: Colors.textSecondary, 
    textAlign: 'center',
    lineHeight: 20
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 150,           
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textPrimary, 
    marginHorizontal: 4,
  },
});