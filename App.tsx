import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
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


function App(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders);
  const [newReminder, setNewReminder] = useState('');
  const sortedReminders = [...reminders];
  sortedReminders.sort((a, b) => a.completed - b.completed);

  const toggleCompletion = (index: number) => {
    const updatedReminders = [...reminders];
    updatedReminders[index].completed = !updatedReminders[index].completed;
    setReminders(updatedReminders);
  };

  const addReminder = () => {
    if (newReminder.trim() !== '') {
      const updatedReminders = [
        ...reminders,
        {title: newReminder, completed: false},
      ];
      setReminders(updatedReminders);
      setNewReminder('');
    }
  };

  const renderItem = ({item, index}: {item: Reminder; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => toggleCompletion(index)}
        style={styles.item}
      >
        <View style={styles.item}>
          <RadioButton
            value={item.title}
            status={item.completed ? 'checked' : 'unchecked'}
            color="royalblue"
          />
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Reminders</Text>
        <Text style={styles.title}>{reminders.length}</Text>
      </View>
      <FlatList data={sortedReminders} renderItem={renderItem} />
      <TextInput
        style={styles.input}
        onChangeText={setNewReminder}
        value={newReminder}
        placeholder="Add a new reminder"
        onSubmitEditing={addReminder}
      />
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
  input: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#454547',
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'royalblue',
  },
});

export default App;
