// // import { Text, ZStack, Box } from "native-base";
// // import { View } from "react-native";
import MapView from "react-native-maps";
// // import { MapTopBar } from "../components/Map";

// // export default function MapScreen() {
// //   return (
// //     // <ZStack alignItems="center" justifyContent="center">
// //     //   <Box bg="indigo.700" size="64" rounded="lg" />
// //     //   <Box bg="indigo.500" size="48" rounded="lg" shadow={8} />
// //     //   <Box bg="indigo.300" size="32" rounded="lg" shadow={8} />
// //     <View
// //       style={{
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center",
// //       }}
// //     >
// //       <Text>hello</Text>
// //       <MapView
// //         style={{
// //           width: "100%",
// //           height: "100%",
// //         }}
// //       />
// //     </View>
// //     // </ZStack>
// //   );
// // }

// // @flow

// import React from "react";
// import { View, StyleSheet, Text } from "react-native";
import { Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// export default function MapScreen() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.center}>
//         <Text>hiu</Text>
//         <View style={styles.behind}>
//           {/* <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           > */}
//           <MapView
//             style={{
//               width: windowWidth,
//               height: windowHeight,
//             }}
//           />
//           {/* </View> */}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     height: "100%",
//     justifyContent: "center",
//   },
//   center: {
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   behind: {
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     left: 0,
//     top: 0,
//     width: "100%",
//     height: "100%",
//   },
// });

import React, { useCallback, useMemo, useRef } from "react";
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
} from "native-base";
import { MapTopBar } from "../components/Map";
import { Ionicons } from "@expo/vector-icons";

const MapScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["13%", "25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <MapView
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      />
      <HStack width="100%" justifyContent="space-between" position="absolute">
        <MapTopBar />
      </HStack>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          {/* <Box
            bg="primary.600"
            py="4"
            px="3"
            borderRadius="5"
            rounded="md"
            width={375}
            maxWidth="100%"
          >
            <HStack justifyContent="space-between">
              <Box justifyContent="space-between">
                <VStack space="2">
                  <Text fontSize="sm" color="white">
                    Today @ 9PM
                  </Text>
                  <Text color="white" fontSize="xl">
                    Let's talk about avatar!
                  </Text>
                </VStack>
                <Pressable
                  rounded="xs"
                  bg="primary.400"
                  alignSelf="flex-start"
                  py="1"
                  px="3"
                >
                  <Text
                    textTransform="uppercase"
                    fontSize="sm"
                    fontWeight="bold"
                    color="white"
                  >
                    Remind me
                  </Text>
                </Pressable>
              </Box>
              <Image
                source={{
                  uri: "https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg",
                }}
                alt="Aang flying and surrounded by clouds"
                height="100"
                rounded="full"
                width="100"
              />
            </HStack>
          </Box> */}
          <HStack
            alignItems={"center"}
            justifyContent="center"
            space={3}
            px="2"
          >
            <Input
              placeholder="Search"
              variant="filled"
              width="90%"
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
              bg="lightBlue.400"
              source={{
                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              }}
              size="xs"
            >
              NB
              <Avatar.Badge bg="green.500" />
            </Avatar>
          </HStack>
        </View>
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
