import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Heading, HStack, Icon, IconButton, Image, VStack } from "native-base";
import { View, Text, TouchableOpacity, Pressable } from "react-native";

import styled from "styled-components/native";
import theme from "styles/GlobalStyles";

export function HHeaderAccount() {
  return (
    // <>SHeaderAccountContainer>
    //   <TouchableOpacity>
    //     <Ionicons
    //       name="ios-settings-outline"
    //       size={24}
    //       color={theme.colors.white}
    //     />
    //   </TouchableOpacity
    //   <SAccountContainer>
    //     <Pressable
    //       onPress={() => {
    //         console.log("hi");
    //       }}
    //     >
    //       <Image
    //         w="50"
    //         h="50"
    //         rounded="xl"
    //         source={require("../../../assets/kabacircle.png")}
    //       />
    //     </Pressable>
    //   </SAccountContainer>
    //   <SAccountContainer>
    //     <Pressable
    //       onPress={() => {
    //         console.log("hi");
    //       }}
    //     >
    //       <Image
    //         w="50"
    //         h="50"
    //         rounded="xl"
    //         source={require("../../../assets/kabacircle.png")}
    //       />
    //     </Pressable>
    //   </SAccountContainer>
    //   <SSpacing />
    // </>
    <HStack alignItems="center" w="100%" justifyContent="space-between">
      <TouchableOpacity>
        <Heading color="white" sub>
          FILTER
        </Heading>
      </TouchableOpacity>
      <VStack>
        <IconButton
          // onPress={() => {
          //   handleClosePress();
          // }}
          icon={<Icon as={FontAwesome} name="location-arrow" />}
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
      </VStack>
    </HStack>
  );
}

const SHeaderAccountContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SAccountContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const SSpacing = styled.View`
  min-width: 35px;
`;

const SPicture = styled.ImageBackground`
  width: 40px;
  height: 40px;

  border-bottom-end-radius: 20px;
  border-top-end-radius: 20px;
  border-bottom-start-radius: 20px;
  border-top-start-radius: 20px;
  overflow: hidden;

  border: 2px solid ${theme.colors.purple_normal};
`;
