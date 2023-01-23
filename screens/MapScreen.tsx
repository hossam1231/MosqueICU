// // import { Text, ZStack, Box } from "native-base";
// // import { View } from "react-native";
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
import MapView, { Marker } from "react-native-maps";
import { Dimensions, Pressable } from "react-native";

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
import FlatListFL from "../components/FlatList.Map";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MapScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  // const snapPoints = useMemo(() => ["13%", "25%", "50%"], []);
  const snapPoints = useMemo(
    () => [windowHeight / 10, windowHeight / 5, windowHeight / 2.5],
    []
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    console.log("%c 3️⃣: MapScreen -> windowWidth " + windowWidth);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <MapView
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
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          image={{
            uri: "https://cdn-icons-png.flaticon.com/512/3448/3448600.png",
          }}
        />
      </MapView>
      <HStack width="100%" justifyContent="space-between" position="absolute">
        <MapTopBar />
      </HStack>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <Box p="2" flex="1">
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            h={windowHeight / 10 / 2}
          >
            <Input
              placeholder="Search"
              variant="filled"
              width="85%"
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
              size="md"
            >
              NB
              <Avatar.Badge bg="green.500" />
            </Avatar>
          </HStack>
        </Box>

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
