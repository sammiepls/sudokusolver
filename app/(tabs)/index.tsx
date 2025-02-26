import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { SafeThemedView } from "@/components/ThemedView";
import React from "react";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";

const init_board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const EMPTY = ".";
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const isValidMove = (
  num: number,
  row: number,
  col: number,
  board: number[],
) => {
  // Check Row and Column
  for (let i = 0; i < board.length; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};

export default function HomeScreen() {
  const [board, setBoard] = React.useState(init_board);
  const [selectedBox, setSelectedBox] = React.useState<null | {
    x: number;
    y: number;
  }>(null);
  const [tempBoard, setTempBoard] = React.useState([]);

  let grid = React.useRef(board);

  const solveSudoku = () => {
    for (let i = 0; i < grid.current.length; i++) {
      for (let j = 0; j < grid.current.length; j++) {
        // check if empty
        if (grid.current[i][j] === EMPTY) {
          for (let n = 0; n < NUMBERS.length; n++) {
            if (isValidMove(NUMBERS[n], i, j, grid.current)) {
              grid.current[i][j] = NUMBERS[n];

              // recurse
              if (solveSudoku()) return true;

              // unsuccessful, reset to empty
              grid.current[i][j] = EMPTY;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolveSudoku = () => {
    solveSudoku();
    setTempBoard(board);
  };

  const handleSelect = (value) => {
    setBoard((b) => {
      const newBoard = [...b];
      newBoard[selectedBox.coords.x][selectedBox.coords.y] = value;
      return newBoard;
    });
    setSelectedBox(null);
  };

  return (
    <SafeThemedView style={styles.container}>
      <ThemedText className="text-center text-3xl pt-4">
        Sudoku Solver
      </ThemedText>

      <View className="flex-1 align-center justify-center p-2 ">
        {((!!tempBoard.length && tempBoard) || board).map((row, index) => (
          <Row
            row={row}
            index={index}
            key={index}
            selectBox={setSelectedBox}
            selectedBox={selectedBox}
          />
        ))}
      </View>

      <View className="flex-row justify-between mt-2 mb-2 p-8 ">
        {Array.from({ length: 9 }).map((_, n) => (
          <Pressable
            key={n}
            disabled={!selectedBox}
            className="flex-1 align-center rounded-lg px-2 py-1 bg-blue-300 ml-1 mr-1"
            onPress={() => handleSelect(n + 1)}
          >
            <Text className="text-center text-lg text-bold">
              {(n + 1).toString()}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button title="Solve!" onPress={handleSolveSudoku} />
    </SafeThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 60,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
