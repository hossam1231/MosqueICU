import { Video } from "expo-av";
import { Heading, VStack, Box, Badge } from "native-base";
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
        <VStack
          space={3}
          size="sm"
          position="absolute"
          bottom="60"
          left="0"
          borderRightRadius="30px"
          borderWidth="1px"
          shadow={3}
          bg="white"
          borderColor="grey"
          p="5"
        >
          <Badge>
            <Text fontFamily="Oswald-SemiBold">Donate</Text>
          </Badge>
          <Heading color="grey.600" sub>
            You will be directed to www.britishredcross.com to complete your
            donation
          </Heading>
        </VStack>
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
