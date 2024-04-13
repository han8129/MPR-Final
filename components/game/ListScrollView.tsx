import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Color } from "../../constants/Color";

// Define a type for the items in the list that requires a 'name' property
interface ListItemWithName {
  name: string;
  desc: string;
  // Add any other required properties here
}

interface ListScrollViewProps<T extends ListItemWithName> {
  itemList: T[];
  onPressItem: (index: number) => void; // Callback function for item press
  progressState: boolean[]; // Progress state for each item
}

const ListScrollView = <T extends ListItemWithName>({
  itemList,
  onPressItem,
  progressState,
}: ListScrollViewProps<T>) => {
  return (
    <ScrollView>
      {itemList.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => onPressItem(index)}>
          <View style={styles.item}>
            {progressState[index] ? null : (
              <Text style={styles.progressText}>In progress</Text>
            )}
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.desc}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Color.red,
    position: "absolute",
    right: 16,
    top: 0
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default ListScrollView;
