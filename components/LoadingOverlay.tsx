import React, { FC } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingOverlayProps { }

const LoadingOverlay: FC<LoadingOverlayProps> = () => {
    return (
        <View style={styles.container} >
            <Text>Loading </Text>
            < ActivityIndicator size={24} color='green' />
        </View>
    );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
});