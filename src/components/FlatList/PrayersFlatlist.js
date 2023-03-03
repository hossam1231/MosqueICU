import React from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";
import AnimationWithImperativeApi from "components/LottieAnimation";
import OnpressAnimation from "components/Lottie/OnpressAnimation";
import { latLocation, lonLocation } from "../../../data/location";
export default function PrayersFlatlist() {
  const [prayerTimes, setPrayerTimes] = React.useState();

  // console.log(prayerTimes);

  async function getPrayerTimes() {
    const response = await fetch(
      `http://api.aladhan.com/v1/timings?latitude=${latLocation}&longitude=${lonLocation}&method=2`
    );
    const data = await response.json();
    let prayerTimesArray = [];
    Object.entries(data.data.timings).forEach((element) => {
      prayerTimesArray.push({
        name: element[0],
        time: element[1],
        id: element[0],
      });
    });
    setPrayerTimes(prayerTimesArray);
    return data;
  }
  React.useEffect(() => {
    getPrayerTimes();
  }, []);

  return (
    <Center>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={prayerTimes}
        renderItem={({ item }) => (
          <VStack
            space={3}
            justifyContent="center"
            alignItems={"center"}
            w="10"
            m="2"
          >
            {/* <AnimationWithImperativeApi /> */}
            <Text
              fontFamily={"Oswald-Bold"}
              fontSize="10px"
              _dark={{
                color: "warmGray.50",
              }}
              // color="coolGray.800"
              color="#CFCFCF"
            >
              {item.name}
            </Text>
            <Center w="50" h="50">
              {/* <Box w="2" h="2" bg="white" rounded="xl"></Box> */}
              {/* <AnimationWithImperativeApi name={"popular-heart"} />
               */}
              <OnpressAnimation />
            </Center>
          </VStack>
        )}
        keyExtractor={(item) => item.id}
      />
    </Center>
  );
}
