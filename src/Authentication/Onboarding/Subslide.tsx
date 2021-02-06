import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '../../components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        padding: 44,
    },
    subtitle: {
        textAlign: "center",
        marginTop: 24,
        marginBottom: 3
    },
    description: {
        textAlign: "center",
        marginBottom: 20  
    }
})

interface SubslideProps {
    subtitle: string;
    description: string;
    last?: boolean;
    onPress: () => void;
}

const Subslide = ({ subtitle, description, last, onPress }: SubslideProps) => {
    return (
        <View style={styles.container}>
            <Text variant="title2" style={styles.subtitle}>{subtitle}</Text>
            <Text variant="body" style={styles.description}>{description}</Text>
            <Button 
                label={last ? "Let's get started" : "Next"} 
                variant={last ? "primary" : "default"} 
                {...{ onPress }}
            />
        </View>
    )
}

export default Subslide
