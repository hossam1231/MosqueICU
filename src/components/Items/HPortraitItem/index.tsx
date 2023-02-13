import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { IItemData } from "../IItemData";
import { SImage, SPosition, STextPosition, STitle } from "./styles";

interface Props extends IItemData {
  position?: number;
}

export function HPortraitItem({ id, image, title, position, onPress }: Props) {
  const safeTitle =
    !!title && title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
      <View style={{ paddingBottom: !!title ? 10 : 0 }}>
        <SImage source={image}>
          {!!position && (
            <SPosition style={{ width: position > 9 ? 32 : 24 }}>
              <STextPosition>{"#" + position}</STextPosition>
            </SPosition>
          )}
        </SImage>
        {!!title && <STitle>{safeTitle}</STitle>}
      </View>
    </TouchableOpacity>
  );
}

export function HPortraitItemML({
  id,
  image,
  author,
  title,
  position,
  onPress,
}: IItemData) {
  return (
    <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
      <View style={{ paddingBottom: !!title ? 10 : 0 }}>
        <SImage source={image}></SImage>
        {/* {!!title && <STitle>{safeTitle}</STitle>} */}
      </View>
    </TouchableOpacity>
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
