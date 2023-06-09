import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import { RadioButton } from "react-native-paper";

type Reminder = {
  title: string;
  completed: boolean;
};

const defaultReminders: Reminder[] = [
  {
    title: 'Subscribe to notJust.dev',
    completed: false,
  },
  {
    title: 'Build exciting apps',
    completed: false,
  },
  {
    title: 'Be happy',
    completed: false,
  },
];

const renderItem = ({item, index}: {item: Reminder; index: number}) => (
  <View style={styles.item}>
    <RadioButton
      value={item.title}
      status={item.completed ? 'checked' : 'unchecked'}
      color="royalblue"
    />
    <Text style={styles.itemTitle}>{item.title}</Text>
  </View>
);


function App(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders);

  return (
    <View style={styles.container}>
      <FlatList data={reminders} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#211D2D',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#454547',
    paddingVertical: 5,
  },
  itemTitle: {
    flex: 1,
    marginLeft: 5,
  },
});

export default App;
