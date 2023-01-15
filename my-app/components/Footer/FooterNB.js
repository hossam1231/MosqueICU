import React from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function FooterNB() {
  const [selected, setSelected] = React.useState(1);
  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      flex={1}
      bg="white"
      safeAreaTop
      width="100%"
      //   maxW="300px"
      position={"absolute"}
      bottom="0"
      alignSelf="center"
    >
      <HStack
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        bg="indigo.600"
        alignItems="center"
        safeAreaBottom
        shadow={6}
      >
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon
              _light={{ color: "blueGray.500" }}
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "home" : "home-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text
              _light={{ color: "blueGray.500" }}
              color="white"
              fontSize="12"
            >
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}
        >
          <Center>
            <Icon
              _light={{ color: "blueGray.500" }}
              mb="1"
              as={<MaterialIcons name="search" />}
              color="white"
              size="sm"
            />
            <Text
              _light={{ color: "blueGray.500" }}
              color="white"
              fontSize="12"
            >
              Search
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(2)}
        >
          <Center>
            <Icon
              _light={{ color: "blueGray.500" }}
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? "cart" : "cart-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text
              _light={{ color: "blueGray.500" }}
              color="white"
              fontSize="12"
            >
              Cart
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}
        >
          <Center>
            <Icon
              _light={{ color: "blueGray.500" }}
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? "account" : "account-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text
              _light={{ color: "blueGray.500" }}
              color="white"
              fontSize="12"
            >
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
