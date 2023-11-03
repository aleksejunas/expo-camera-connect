import { Camera, CameraType } from 'expo-camera'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'

async function setAspectRatio() {
    // Get the supported aspect ratios
    const supportedRatios = await Camera.getSupportedRatiosAsync();
}

const CameraComponent = () => {
    const [type, setType] = useState(CameraType.back)
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to use your camera</Text>
                <Button onPress={requestPermission} title='grant permission' />
            </View>
        )
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ?
            CameraType.front : CameraType.back))
    }


    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}


export default CameraComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    camera: {

        width: 300,
        height: 600
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
