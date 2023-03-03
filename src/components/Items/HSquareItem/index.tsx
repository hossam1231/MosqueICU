import {
  Button,
  Touchable,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IItemData } from "../IItemData";
import { SImage, STitle } from "./styles";
import React, { Component } from "react";
import {
  SBoxContainer,
  STextInputContainer,
} from "components/HTextInput/styles";
import { Box, Center, Heading, Pressable, VStack } from "native-base";

export function HSquareItem({ id, image, title, onPress }: IItemData) {
  const safeTitle =
    !!title && title.length > 35 ? `${title.substring(0, 35)}...` : title;

  return (
    <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
      <View style={{ paddingBottom: !!title ? 10 : 0 }}>
        <SImage source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }} />
        {!!title && <STitle>{safeTitle}</STitle>}
      </View>
    </TouchableOpacity>
  );
}

export function HSquareItemML({
  id,
  image,
  author,
  title,
  onPress,
}: IItemData) {
  return (
    <VStack>
      <Box p="1" h="100" w="100">
        <SBoxContainer>
          <Center flex="1">
            <Image
              style={{ width: 60, height: 60 }}
              // source={require("@expo/snack-static/react-native-logo.png")}
              source={image}
            />
          </Center>
          {/* <Text style={[styles.textStyle, { paddingTop: 10 }]}>{author}</Text>
        <Text style={styles.textStyle}> Jenifer Lawrance</Text>
        
        <Text style={styles.textStyle}> Jenifer Lawrance</Text>
      <Text style={styles.textStyle}> +14155552671</Text> */}
          {/* <ImageBackground
        source={require("../../../../assets/mudBackground.png")}
        style={styles.container}
      > */}
        </SBoxContainer>
      </Box>
      <Box p="1">
        <Heading ml="1" color="white" sub>
          {title}
        </Heading>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {},
  overlay: {
    backgroundColor: "rgba(255,0,0,0.5)",
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  textStyle: {
    marginTop: 10,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
  },
  balanceContainer: {
    padding: 10,
  },
});
