import { Box, Center, HStack, Image } from "native-base";
import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { SImage, STitle } from "./styles";

export function HLongLandscapeItem({ id, image, title, onPress }: IItemData) {
  return (
    <TouchableOpacity
      style={{ padding: 2, margin: 2 }}
      onPress={() => !!onPress && onPress(id)}
    >
      <HStack bg="black" rounded={"sm"} w="350" h="150">
        <Box flex="1" roundedLeft={"sm"} bg="green.100"></Box>
        <Center width="40%" bg="blue.100" roundedRight={"sm"}></Center>
      </HStack>
    </TouchableOpacity>
  );
}
