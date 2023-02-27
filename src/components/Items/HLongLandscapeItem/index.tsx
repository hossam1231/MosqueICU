import { Box, Center, Heading, HStack, Image, Text } from "native-base";
import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { SImage, STitle } from "./styles";

export function HLongLandscapeItem({
  id,
  chart,
  image,
  title,
  onPress,
}: IItemData) {
  return (
    <TouchableOpacity
      style={{ padding: 2, margin: 2 }}
      onPress={() => !!onPress && onPress(id)}
    >
      {/* <HStack bg="black" rounded={"sm"} w="350" h="220">
        <Box p="1" flex="1" roundedLeft={"sm"} bg="green.100"> */}
      <>{chart}</>
      <Center
        p={2}
        rounded={"xl"}
        bg="white"
        m="5"
        position={"absolute"}
        right="0"
      >
        <Image w="10" h="10" source={image} />
      </Center>
      {/* </Box> */}

      {/* <Center width="40%" bg="blue.100" roundedRight={"sm"}>
          <Image w="100" h="100" source={image} />
        </Center> */}
      {/* // </HStack> */}
    </TouchableOpacity>
  );
}
