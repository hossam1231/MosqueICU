import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import {
  Heading,
  VStack,
  Box,
  Badge,
  Icon,
  Button,
  HStack,
  IconButton,
} from "native-base";
import { useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function CausesScreen() {
  const opacity = useMemo(() => new Animated.Value(0), []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View
          style={[styles.backgroundViewWrapper, { opacity: opacity }]}
        >
          <Video
            isLooping
            isMuted
            positionMillis={500}
            onLoad={() => {
              // https://facebook.github.io/react-native/docs/animated#timing
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
            resizeMode="cover"
            shouldPlay
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
      <View style={styles.overlay}>
        <VStack space={2} safeArea p="10">
          <Heading size="4xl" fontFamily="Oswald-Bold" color="white">
            BUILD A SCHOOL
          </Heading>
          <Heading sub color="white">
            SADAKAH TUL JARIA
          </Heading>
        </VStack>
        <HStack
          width="70%"
          position="absolute"
          bottom="60"
          left="0"
          borderRightRadius="10px"
          borderRightWidth="1px"
          borderTopWidth="1px"
          borderBottomWidth="1px"
          shadow={1}
          bg="#301A3A"
          borderColor="#bf7af0"
          p="5"
        >
          <VStack pr="10" flex="1" space={3}>
            <HStack justifyContent={"space-between"}>
              <Button
                // leftIcon={
                //   <Icon name="home" style={{ fontSize: 20, color: "red" }} />
                // }
                w="100%"
                bg="#bf7af0"
              >
                <Text color="#301a3a">Support cause</Text>
              </Button>
              <IconButton
                ml="2"
                colorScheme="indigo"
                _icon={{
                  as: Ionicons,
                  name: "information-circle",
                }}
              />
            </HStack>

            <Heading color="#BF7AF0" sub>
              You will be directed to www.britishredcross.com to complete your
              donation
            </Heading>
          </VStack>
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "white",
    fontSize: 20,
    // marginTop: 90,
    // paddingHorizontal: 20,
    // textAlign: "center",
  },
});
