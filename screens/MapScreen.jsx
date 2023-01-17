// import { Text, ZStack, Box } from "native-base";
// import { View } from "react-native";
import MapView from "react-native-maps";
// import { MapTopBar } from "../components/Map";

// export default function MapScreen() {
//   return (
//     // <ZStack alignItems="center" justifyContent="center">
//     //   <Box bg="indigo.700" size="64" rounded="lg" />
//     //   <Box bg="indigo.500" size="48" rounded="lg" shadow={8} />
//     //   <Box bg="indigo.300" size="32" rounded="lg" shadow={8} />
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>hello</Text>
//       <MapView
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//       />
//     </View>
//     // </ZStack>
//   );
// }

// @flow

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text>hiu</Text>
        <View style={styles.behind}>
          {/* <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          > */}
          <MapView
            style={{
              width: windowWidth,
              height: windowHeight,
            }}
          />
          {/* </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  center: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  behind: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
});
