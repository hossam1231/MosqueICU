import MapView, { Marker } from "react-native-maps";
import { Dimensions, Pressable, TouchableHighlight } from "react-native";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import base64 from "react-native-base64";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  Box,
  Center,
  Image,
  HStack,
  VStack,
  Input,
  Icon,
  Avatar,
  IconButton,
  Heading,
  Badge,
  Text,
} from "native-base";
import { MapTopBar } from "components/Map";
import { Entypo, Ionicons } from "@expo/vector-icons";
import FlatListFL from "components/FlatList.Map";
import { sleep } from "../../functions/sleep";
import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MapScreen = () => {
  const [mapMarkers, setMapMarkers] = useState();
  const [location, setLocation] = useState({});

  const [currentMarker, setCurrentMarker] = useState();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  function snapPoints() {
    return useMemo(() => ["13%", "25%", "50%"], []);
  }
  // const snapPoints = useMemo(
  //   () => [windowHeight / 10, windowHeight / 5, windowHeight / 2.5],
  //   []
  // );
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5,
      });
      console.log(location);
      setLocation(location);
    })();
  }, []);

  async function getMarkersInPostcodes(postcodes) {
    const response = await axios.post("https://web.mosque.icu/api/map", {
      postcodes: JSON.stringify(postcodes),
    });
    console.log(response.data);
  }

  async function getNearestLocation() {
    const response = await fetch(
      `https://api.postcodes.io/postcodes?lon=${location.coords.longitude}&lat=${location.coords.latitude}`
    );
    const data = await response.json();
    getMarkersInPostcodes(data.result);
  }

  React.useEffect(() => {
    if (location) {
      goToMyLocation();
      getNearestLocation();
    }
  }, [location]);

  const handleToggleInfo = () => {
    bottomSheetRef.current.snapToIndex(2);
  };
  const handleClosePress = () => bottomSheetRef.current.close();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === 1) {
      setCurrentMarker({ ref: index });
    }
    console.log("%c 3️⃣: MapScreen -> windowWidth " + windowWidth);
  }, []);

  let fakeData = [
    {
      type: "mosque",
      latitude: 37.78625,
      longitude: -122.4524,
      application: { name: "AR-RAHMAAN" },
    },
    {
      type: "mosque",
      latitude: 37.7125,
      longitude: -122.4124,
      application: { name: "AR-RAHEEM" },
    },
    {
      type: "mosque",
      latitude: 37.78225,
      longitude: -122.4324,
      application: { name: "AL-MALIK" },
    },
    {
      type: "community_center",
      latitude: 37.78325,
      longitude: -122.4324,
      application: { name: "AL-QUDDUS" },
    },
    {
      type: "community_center",
      latitude: 37.74825,
      longitude: -122.9324,
      application: { name: "AS-SALAM" },
    },
    {
      type: "community_center",
      latitude: 37.78825,
      longitude: -122.6324,
      application: { name: "AL-MU’MIN" },
    },
    {
      type: "preacher",
      latitude: 99.78945,
      longitude: -122.5324,
      application: { name: "AL-MUHAYMIN" },
    },
    {
      type: "preacher",
      latitude: 22.78815,
      longitude: -139.1324,
      application: { name: "AL-AZIZ" },
    },
    {
      type: "preacher",
      latitude: 29.78825,
      longitude: -111.4334,
      application: { name: "AL-JABBAR	" },
    },
  ];

  function getImageType(data: String) {
    switch (data) {
      case "mosque":
        return require("../../assets/markergpsmosque.png");
        break;
      case "community_center":
        return require("../../assets/markergpscommunity.png");
        break;
      case "preacher":
        return require("../../assets/markergpspreacher.png");
        break;
      default:
        return null;
        break;
    }
  }
  const mapRef = React.createRef();

  const goToMyLocation = async () => {
    console.log("goToMyLocation");
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // latitudeDelta: 0.003663,
        // longitudeDelta: 0.002001,
      },
      altitude: 4000,
      zoom: 10,
    });
  };
  return (
    <>
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        userInterfaceStyle={"dark"}
        style={{
          position: "absolute",
          width: windowWidth,
          height: windowHeight,
        }}
      >
        {/* {fakeData.map((data) => {
          return (
            <Marker
              style={{ width: 26, height: 28 }}
              onPress={() => {
                handleToggleInfo();
                setCurrentMarker(data);
                console.log(data);
              }}
              isPreselected={false}
              title={data.application.name}
              tappable={true}
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              // icon={getImageType(data.type)}
              // image={getImageType(data.type)}
            >
              <Image
                source={getImageType(data.type)}
                style={{ width: 26, height: 28 }}
                resizeMode="center"
              />
            </Marker>
          );
        })} */}
      </MapView>
      <Text>{JSON.stringify(location)}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default MapScreen;
