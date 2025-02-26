import { View } from "react-native";
import { Box } from "./Box";

export const Row = ({ row, index, selectBox, selectedBox }) => {
  return (
    <View className="flex-row justify-center">
      {row.map((col: number, colIndex: number) => {
        const coords = { x: index, y: colIndex };

        return (
          <Box
            value={col}
            coords={coords}
            key={colIndex}
            selectBox={selectBox}
            selected={
              selectedBox &&
              coords.x === selectedBox.coords.x &&
              coords.y === selectedBox.coords.y
            }
          />
        );
      })}
    </View>
  );
};
