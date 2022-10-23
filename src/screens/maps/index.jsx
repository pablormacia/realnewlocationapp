import React, {useLayoutEffect, useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView,{Marker} from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./styles";
import colors from "../../utils/colors";

const Maps = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const initialRegion = {
    latitude: 32.297154,
    longitude: -64.869152,
    latitudeDelta: 1,
    longitudeDelta: 1,
  }

  const onHandlePickLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };
  const onHandleSaveLocation=()=>{
    if(selectedLocation) navigation.navigate("NewPlace", {mapLocation: selectedLocation})
  }  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ()=> (
        <TouchableOpacity onPress={onHandleSaveLocation}>
          <Ionicons name="md-save-sharp" size={24} color={colors.black} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, onHandleSaveLocation]);

  return (
    <MapView style={styles.container} initialRegion={initialRegion} onPress={onHandlePickLocation}>
      {selectedLocation && (
        <Marker
          title="Dirección seleccionada"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
        }}
        />
      )}
    </MapView>
  );
};

export default Maps;
