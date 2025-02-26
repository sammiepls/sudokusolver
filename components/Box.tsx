import React from "react";
import { View, Text, Pressable } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { useWindowDimensions } from "react-native";

export const Box = ({ value, coords, selectBox, selected }) => {
  const baseColor = useThemeColor({}, "grid");
  const selectedColor = useThemeColor({}, "gridSelected");

  const { width } = useWindowDimensions();
  const BOX_WIDTH = (width - 20) / 9;

  const isTopSide = coords.x === 0;
  const isLeftSide = coords.y === 0;
  const isBottomSide = coords.x === 8;
  const isRightSide = coords.y === 8;

  const rightFirstGrid = coords.y === 2 || coords.y === 5;
  const bottomFirstGrid = coords.x === 2 || coords.x === 5;

  const gridStyle = {
    rightFirstGridStyle: rightFirstGrid ? "border-r-4 " : "",
    bottomFirstGridStyle: bottomFirstGrid ? "border-b-4 " : "",
    isTopSideStyle: isTopSide ? "border-t-4" : "",
    isLeftSideStyle: isLeftSide ? "border-l-4" : "",
    isBottomSideStyle: isBottomSide ? "border-b-4" : "",
    isRightSideStyle: isRightSide ? "border-r-4" : "",
  };

  const combinedStyles = Object.values(gridStyle)
    .filter((style) => style !== "") // Remove empty styles
    .join(" "); // Join with a space

  return (
    <View
      className={`border
        ${combinedStyles}
        `}
      style={{
        width: BOX_WIDTH,
        height: BOX_WIDTH,
        borderColor: selected ? selectedColor : baseColor,
        borderWidth: selected ? 4 : 1,
      }}
    >
      <Pressable
        className="flex-1 justify-center"
        onPress={() => {
          selectBox({ coords });
        }}
      >
        <Text className="text-center text-2xl ">{value}</Text>
      </Pressable>
    </View>
  );
};
