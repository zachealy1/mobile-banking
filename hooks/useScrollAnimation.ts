import { useCallback, useState } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const useScrollAnimation = (borderOpacity: Animated.Value) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;

        if (scrollOffsetY > 10 && !isScrolled) {
            setIsScrolled(true);

            Animated.timing(borderOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else if (scrollOffsetY <= 10 && isScrolled) {
            setIsScrolled(false);

            Animated.timing(borderOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isScrolled, borderOpacity]);

    return { isScrolled, handleScroll };
};
