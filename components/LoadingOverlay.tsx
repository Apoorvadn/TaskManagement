import React, { FC } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from 'assets/colors/globalcolors';

interface LoadingOverlayProps { }

const LoadingOverlay: FC<LoadingOverlayProps> = () => {
    return (
        <View style={styles.container} >
            <Text>Loading </Text>
            < ActivityIndicator size={24} color={colors.offWhite} />
        </View>
    );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});