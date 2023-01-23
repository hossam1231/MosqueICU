import React from "react";
import { IconButton, Icon, Box, Center, NativeBaseProvider } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StaggerButton } from "./stagger";

export const MapTopBar = () => {
  const navigation = useNavigation();
  return (
    <>
      <Box
        // bg="grey"
        safeArea
        p="5"
        rounded="xl"
        position={"fixed"}
        left="0"
        top="0"
        alignItems="center"
      >
        <IconButton
          onPress={() => {
            navigation.goBack();
          }}
          shadow={3}
          icon={<Icon as={Entypo} name="back" color="white" />}
          borderRadius="full"
          _icon={{
            color: "grey.500",
            size: "md",
          }}
          _hover={{
            bg: "grey.600:alpha.20",
          }}
          _pressed={{
            bg: "grey.600:alpha.20",
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
      </Box>
      <StaggerButton />
    </>
  );
};
