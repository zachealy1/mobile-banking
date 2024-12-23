import React from 'react';
import { View, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemedText } from '@/components/ThemedText';
import { currencyItems } from '@/constants/Data';
import { StyleSheet } from 'react-native';

interface SwiperProps {
    swiperTranslateY: Animated.AnimatedInterpolation<any>;
    handleSnapToItem: (index: number) => void;
    onSlideDrag: (progress: number, absoluteProgress: number) => void;
    scrollY: Animated.Value;
}

const Swiper: React.FC<SwiperProps> = ({ swiperTranslateY, handleSnapToItem, onSlideDrag }) => {
    const width = Dimensions.get('window').width;

    return (
        <Animated.View style={[styles.swiperContainer, { transform: [{ translateY: swiperTranslateY }] }]}>
            <Carousel
                loop={false}
                width={width}
                height={width / 2}
                autoPlay={false}
                data={currencyItems}
                scrollAnimationDuration={500}
                mode="parallax"
                vertical={false}
                pagingEnabled={true}
                snapEnabled={true}
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 80,
                }}
                onSnapToItem={handleSnapToItem}
                onProgressChange={onSlideDrag}
                renderItem={({ item }) => (
                    <View style={styles.swiper}>
                        <View style={styles.slide}>
                            <ThemedText style={styles.slideText}>
                                {item.symbol}
                            </ThemedText>
                        </View>
                    </View>
                )}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    swiperContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 180,
        marginTop: 80,
        marginBottom: 180,
        zIndex: 1,
    },
    swiper: {
        height: 190,
        marginBottom: 12,
        marginTop: 8,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        marginHorizontal: 20,
        marginVertical: 28,
        padding: 8,
        overflow: 'hidden',
    },
    slideText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        width: '90%',
        lineHeight: 40,
    },
});

export default Swiper;