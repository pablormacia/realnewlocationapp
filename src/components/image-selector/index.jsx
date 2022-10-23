import React, {useState} from "react";
import {View,Text,Image,Button,Alert} from 'react-native';
import colors from "../../utils/colors";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./styles";

const ImageSelector = ({onImage})=>{
    const [pickedUrl, setPickedUrl] = useState()

    const verifyPermissions = async () => {
        const { status} = await ImagePicker.requestCameraPermissionsAsync()

        if (status !== 'granted'){
            Alert.alert("Permisos insuficientes", "Necesitas permiso para acceder a la cámara",[{text: 'Ok'}]);
            return false;
        }
        return true;
    }

    const onHandleTakePhoto = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) return;
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [16,9],
            quality: 0.5,
        });

        setPickedUrl(image.uri);
        onImage(image.uri)

    }

    return(
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickedUrl ? (
                    <Text>Ninguna imagen seleccionada</Text>
                ) :(
                    <Image style={styles.image} source={{uri: pickedUrl}} />
                )}
            </View>
            <Button
                title="Tomar foto"
                color={colors.secondary}
                onPress={onHandleTakePhoto}    
            />
        </View>
    );
}

export default ImageSelector;