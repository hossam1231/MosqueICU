import { useRef } from "react";
import Lottie from "lottie-react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Box } from "native-base";

export default function OnpressAnimation(props) {
  const LottieRef = useRef(null); // <---------------- Create reference variable

  return (
    <TouchableWithoutFeedback
      style={{ height: 70, width: 70 }}
      onPress={() => {
        LottieRef.current.play(); // <---------------- OnPress just call the lottieRef to animate it.
      }}
    >
      <Lottie
        ref={LottieRef}
        loop={false}
        autoPlay={false}
        source={require(`../../../animations/popular-heart.json`)}
      />
    </TouchableWithoutFeedback>
  );
}
