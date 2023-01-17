import React from "react";
import { IconButton, Icon, Box, Center, NativeBaseProvider } from "native-base";
import { Entypo } from "@expo/vector-icons";

export const MapTopBar = () => {
  return (
    <Box position={"fixed"} left="0" top="0" alignItems="center">
      <IconButton
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
    </Box>
  );
};
