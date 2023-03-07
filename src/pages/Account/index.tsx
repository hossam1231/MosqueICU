import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text } from "react-native";
import { HBody } from "components/HBody";
import { HHeaderAccount } from "./HHeaderAccount";
import { SContent } from "./styles";
import MapScreen from "../../screens/MapScreen";

interface Props extends DrawerContentComponentProps {}

export function AccountPage({ navigation }: Props) {
  function openSidebar() {
    navigation.openDrawer();
  }
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      let value = jsonValue != null ? JSON.parse(jsonValue) : null;
      return value;
    } catch (e) {
      // error reading value
    }
  };
  return (
    <HBody
      // useSafeAreaHeader
      customHeaderContent={<HHeaderAccount />}
    >
      <MapScreen location={getData("location")} />
    </HBody>
  );
}
