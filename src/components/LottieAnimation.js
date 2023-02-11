import React, { useEffect, useRef } from "react";
import Lottie, { lottieView } from "lottie-react-native";

export default function AnimationWithImperativeApi() {
  return <Lottie source={require(`../../animations/popular-heart.json`)} />;
}
