import React, {useEffect, useState} from "react";
import {View,Text,Button,Alert} from 'react-native';
import colors from "../../utils/colors";
import * as Location from "expo-location";

import { styles } from "./styles";
import MapPreview from "../map-preview";

import { useNavigation, useRoute } from "@react-navigation/native";

const LocationSelector = ({onLocation})=>{

    const navigation = useNavigation();
    const route=useRoute()
    const [pickedLocation, setPickedLocation] = useState(null)

    const {mapLocation} = route.params || {}



    const verifyPermissions = async () => {
        const { status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted'){
            Alert.alert("Permisos insuficientes", "Necesitas permiso para acceder a la ubicación",[{text: 'Ok'}]);
            return false;
        }
        return true;
    }

    const onHandleLocation = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) console.warn("error");
        //let location = await Location.getCurrentPositionAsync({});
        //console.log(location)

        setPickedLocation({
            lat: 32.297154,
            lng: -64.869152,
          });
          onLocation({
            lat: 32.297154,
            lng: -64.869152,
          });



        /* setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
          onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }); */
    }

    const onHandlePickMap = () => {
        const hasPermission = verifyPermissions();
        if(!hasPermission) return;
        navigation.navigate("Maps")
    }

    useEffect(()=>{
        if(mapLocation) {
            setPickedLocation(mapLocation);
            onLocation(mapLocation)

        }
    }, [mapLocation])

    

    return(
        <View style={styles.container}>
                <MapPreview location={pickedLocation} style={styles.preview}>
                    <Text>Aún no hay direcciones</Text>
                </MapPreview>
                
            <Button
                title="Obtener dirección"
                color={colors.secondary}
                onPress={onHandleLocation}    
            />

            <Button
                title="Elegir en mapa"
                color={colors.primary}
                onPress={onHandlePickMap}    
            />
        </View>
    );
}

export default LocationSelector;