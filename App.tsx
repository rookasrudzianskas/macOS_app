// @ts-nocheck
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
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

  const toggleCompletion = (reminder: Reminder) => {
    const updatedReminders = [...reminders];
    const index = reminders.findIndex((r) => r.title === reminder.title);
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

  const renderItem = ({item}: {item: Reminder}) => {
    return (
      <TouchableOpacity
        onPress={() => toggleCompletion(item)}
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

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
        }
      } catch(e) {
        // error reading value
      }
    }


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
