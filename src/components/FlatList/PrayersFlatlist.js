import React from "react";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import AnimationWithImperativeApi from "components/LottieAnimation";

export default function PrayersFlatlist() {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Fajir",

      avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Duhur",

      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Asr",

      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Magrib",

      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Ishah",

      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];
  return (
    <Box>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          //   <VStack space={3} m="2">
          //     <VStack
          //       alignItems={"center"}
          //       space={[2, 3]}
          //       justifyContent="space-between"
          //     >
          //       <AnimationWithImperativeApi />
          //       <VStack>
          //         <Heading
          //           fontFamily={"Oswald-Bold"}
          //           sub
          //           _dark={{
          //             color: "warmGray.50",
          //           }}
          //           color="coolGray.800"
          //           bold
          //         >
          //           {item.fullName.toUpperCase()}
          //         </Heading>
          //       </VStack>
          //     </VStack>
          //   </VStack>
          <VStack space={3} alignItems={"center"} h="20" w="20" m="2" space={4}>
            <AnimationWithImperativeApi />
            <Heading
              fontFamily={"Oswald-Bold"}
              sub
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {item.fullName.toUpperCase()}
            </Heading>
          </VStack>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
