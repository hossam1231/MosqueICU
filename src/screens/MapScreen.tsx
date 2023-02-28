import MapView, { Marker } from "react-native-maps";
import { Dimensions, Pressable, TouchableHighlight } from "react-native";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
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
} from "native-base";

import { MapTopBar } from "components/Map";
import { Entypo, Ionicons } from "@expo/vector-icons";
import FlatListFL from "components/FlatList.Map";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MapScreen = () => {
  const [currentMarker, setCurrentMarker] = useState();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  function snapPoints() {
    if (currentMarker) {
      return useMemo(() => ["50%", "50%", "50%"], []);
    } else {
      return useMemo(() => ["13%", "25%", "50%"], []);
    }
  }
  // const snapPoints = useMemo(
  //   () => [windowHeight / 10, windowHeight / 5, windowHeight / 2.5],
  //   []
  // );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    console.log("%c 3️⃣: MapScreen -> windowWidth " + windowWidth);
  }, []);

  let fakeData = [
    {
      type: "mosque",
      latitude: 37.78625,
      longitude: -122.4524,
      application: { name: "al iman" },
    },
    {
      type: "mosque",
      latitude: 37.7125,
      longitude: -122.4124,
      application: { name: "al iman" },
    },
    {
      type: "mosque",
      latitude: 37.78225,
      longitude: -122.4324,
      application: { name: "al iman" },
    },
    {
      type: "community_center",
      latitude: 37.78325,
      longitude: -122.4324,
      application: { name: "al iman" },
    },
    {
      type: "community_center",
      latitude: 37.74825,
      longitude: -122.9324,
      application: { name: "al iman" },
    },
    {
      type: "community_center",
      latitude: 37.78825,
      longitude: -122.6324,
      application: { name: "al iman" },
    },
    {
      type: "preacher",
      latitude: 99.78945,
      longitude: -122.5324,
      application: { name: "al iman" },
    },
    {
      type: "preacher",
      latitude: 22.78815,
      longitude: -139.1324,
      application: { name: "al iman" },
    },
    {
      type: "preacher",
      latitude: 29.78825,
      longitude: -111.4334,
      application: { name: "al iman" },
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

  // renders
  return (
    <View style={styles.container}>
      <MapView
        userInterfaceStyle={"dark"}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        {fakeData.map((data) => {
          let opactity = 1;
          return (
            <Marker
              onPress={(opacity) => {
                setCurrentMarker(data);
                console.log(data);
              }}
              opacity={opactity}
              isPreselected={false}
              title={data.application.name}
              tappable={true}
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              icon={getImageType(data.type)}
              image={getImageType(data.type)}
            />
          );
        })}
      </MapView>
      {/* <HStack width="100%" justifyContent="space-between" position="absolute">
        <MapTopBar />
      </HStack> */}
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "#7555F9" }}
        backgroundStyle={{ backgroundColor: "#0F0F0F" }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints()}
        onChange={handleSheetChanges}
      >
        {!currentMarker ? (
          <Box p="2" flex="1">
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              h={windowHeight / 10 / 2}
            >
              <Input
                bg="black"
                placeholder="Search"
                variant="filled"
                width="70%"
                borderWidth="2"
                borderColor={"grey.800"}
                borderRadius="10"
                py="3"
                ml="2"
                px="2"
                InputLeftElement={
                  <Icon
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="ios-search" />}
                  />
                }
              />
              <Avatar
                borderColor={"grey.800"}
                borderWidth="1"
                bg="lightBlue.400"
                source={{
                  uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
                size="md"
              >
                NB
                <Avatar.Badge
                  color="grey.800"
                  borderColor={"grey.800"}
                  bg="green.500"
                />
              </Avatar>
            </HStack>
          </Box>
        ) : (
          <Box p="2" flex="1">
            {" "}
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              h={windowHeight / 10 / 2}
            >
              <IconButton
                onPress={() => {
                  setCurrentMarker("");
                }}
                icon={<Icon as={Entypo} name="emoji-happy" />}
                borderRadius="full"
                _icon={{
                  color: "orange.500",
                  size: "md",
                }}
                _hover={{
                  bg: "orange.600:alpha.20",
                }}
                _pressed={{
                  bg: "orange.600:alpha.20",
                  _icon: {
                    name: "emoji-flirt",
                  },
                  _ios: {
                    _icon: {
                      size: "2xl",
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: "2xl",
                  },
                }}
              />
            </HStack>
            <Heading color="white">Al iman</Heading>
            <HStack>
              <Heading sub color="white">
                Mosque:
              </Heading>
              <Heading sub color="white">
                Northampton,Upton
              </Heading>
            </HStack>
            <Box>
              <HStack space={4} h="100">
                <Box flex="1" bg="white"></Box>
                <Box flex="1" bg="white"></Box>
              </HStack>
            </Box>
            <Heading size="xs" color="white">
              Prayer times
            </Heading>
          </Box>
        )}
        {/* <View style={styles.contentContainer}>
          <HStack
            my="2"
            mb="5"
            alignItems={"center"}
            justifyContent="center"
            space={3}
            px="2"
          >
           
          </HStack> */}
        {/* <FlatListFL />
        </View> */}
      </BottomSheet>
    </View>
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
