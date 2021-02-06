import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import { Box, Text } from '../../components/Theme';
import { Button, theme } from '../../components';
import { Routes, StackNavigationProps } from '../../components/Navigation';


const { width } = Dimensions.get("window");
const picture = {
    src: require('../assets/1.png'),
    width: 300,
    height: 300
}

export const assets = [picture.src]; 

const styles = StyleSheet.create({
    description: {
        marginTop: 12,
        marginBottom: 12
    }
})

const Welcome = ({ navigation }: StackNavigationProps<Routes, "Welcome">) => {
    return (
        <Box flex={1} backgroundColor="white">
            <Box flex={1} borderBottomRightRadius="xl" backgroundColor="grey" alignItems="center" justifyContent="flex-end">
                <Image source={picture.src} style={{ 
                    width: width - theme.borderRadii.xl,
                    height: (width - theme.borderRadii.xl) * picture.height/picture.width,
                }} />
            </Box>
            <Box flex={1} borderTopLeftRadius="xl">
                <Box backgroundColor="grey" position="absolute" top={0} left={0} right={0} bottom={0} />
                <Box backgroundColor="white" borderTopLeftRadius="xl" justifyContent="space-evenly" alignItems="center" flex={1} padding="xl">
                    <Text variant="title2">Let's get started</Text>
                    <Text variant="body" textAlign="center" style={styles.description}>Login to your account below or signup for an amazing experience</Text>
                    <Button 
                        variant="primary" 
                        label="Have an account ? Login"
                        onPress={() => navigation.navigate("Login")} 
                    />
                    <Button 
                        label="Join us, it's Free" 
                        onPress={() => true} 
                    />
                    <Button 
                        variant="transparent" 
                        label="Forgot password?" 
                        onPress={() => true} 
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Welcome