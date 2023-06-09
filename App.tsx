import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


function App(): JSX.Element {

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <RadioButton
          value={'Subscribe to Rokas Rudzianskas'}
          status={'unchecked'}
          color="royalblue"
        />
        <Text style={styles.itemTitle}>Subscribe to Rokas Rudzianskas</Text>
      </View>
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
