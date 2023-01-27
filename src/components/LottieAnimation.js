import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";

export default function AnimationWithImperativeApi() {
  return (
    <Lottie
      autoPlay
      loop
      source={require("../../animations/success-tick.json")}
    />
  );
}
