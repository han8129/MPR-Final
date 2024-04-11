import React from "react";
import { ImageBackground } from "react-native";

const image = require("../../assets/images/bg.jpg");

const TopBackground = () => {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{
        flex: 1,
        width: "100%",
        height : "100%",
      }}
    />
  );
};

export default TopBackground;
