import MapView, { Marker } from "react-native-maps";
import { Dimensions, Pressable, TouchableHighlight } from "react-native";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
} from "native-base";

import { MapTopBar } from "components/Map";
import { Entypo, Ionicons } from "@expo/vector-icons";
import FlatListFL from "components/FlatList.Map";
import { sleep } from "../../functions/sleep";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MapScreen = () => {
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

  const sleepMS = async ({ ms, func }) => {
    for (let i = 1; i < 5; i++) {
      console.log(`Waiting for ${JSON.stringify(ms)}ms`);
      await sleep(ms);
      func();
    }
  };

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
          return (
            <Marker
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
        <BottomSheetScrollView
        //  contentContainerStyle={styles.contentContainer}
        >
          {!currentMarker || currentMarker.ref === 1 ? (
            <Box p="2" flex="1">
              <HStack
                justifyContent={"space-between"}
                alignItems={"center"}
                h={windowHeight / 10 / 2}
              >
                <Input
                  bg="black"
                  placeholder="Search name, address, postcode.."
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
                {/* <HStack>

                </HStack> */}
                <Badge rounded="md" p="2" colorScheme={"dark"}>
                  <HStack space={2} alignItems="center">
                    <Heading sub color="#999999">
                      Compass
                    </Heading>
                    <Image
                      width={"5"}
                      h="5"
                      source={require("../../assets/Kaaba2.png")}
                    />
                  </HStack>
                </Badge>
              </HStack>
              <HStack m="2" space={3}>
                {/* <Badge colorScheme={"dark"}>
                  <Heading sub color="#999999">
                    Mosque
                  </Heading>
                  <Image width={'5'} h='5'  source={require("../../assets/markergpsmosque.png")} />}
                </Badge>
                <Badge colorScheme={"dark"}>
                  <Heading sub color="#999999">
                    Community center
                  </Heading>
                   <Image width={'5'} h='5' source={require("../../assets/markergpsmosque.png")} />}
                </Badge> */}
                <Badge rounded="md" p="2" colorScheme={"dark"}>
                  <HStack space={2} alignItems="center">
                    <Heading sub color="#999999">
                      Mosque
                    </Heading>
                    <Image
                      width={"5"}
                      h="5"
                      source={require("../../assets/ArabicLightLamp2.png")}
                    />
                  </HStack>
                </Badge>
                <Badge rounded="md" p="2" colorScheme={"dark"}>
                  <HStack space={2} alignItems="center">
                    <Heading sub color="#999999">
                      Preacher
                    </Heading>
                    <Image
                      width={"5"}
                      h="5"
                      source={require("../../assets/Lantern4.png")}
                    />
                  </HStack>
                </Badge>
                <Badge rounded="md" p="2" colorScheme={"dark"}>
                  <HStack space={2} alignItems="center">
                    <Heading sub color="#999999">
                      Community center
                    </Heading>
                    <Image
                      width={"5"}
                      h="5"
                      source={require("../../assets/Ketupat4.png")}
                    />
                  </HStack>
                </Badge>
              </HStack>
            </Box>
          ) : (
            <Box p="2" flex="1">
              <HStack
                justifyContent={"flex-end"}
                alignItems={"center"}
                h={windowHeight / 10 / 2}
              >
                <IconButton
                  onPress={() => {
                    handleClosePress();
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
              <Heading color="white">{currentMarker.application.name}</Heading>
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
        </BottomSheetScrollView>

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
