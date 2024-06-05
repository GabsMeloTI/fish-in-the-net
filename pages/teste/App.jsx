import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'C++', value: 'cpp' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a language:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Select an option"
        placeholderStyle={styles.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fundo preto
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff', // Texto branco
  },
  dropdown: {
    backgroundColor: '#333', // Fundo do dropdown
    borderColor: '#444',
  },
  dropdownText: {
    color: '#fff', // Texto branco
  },
  dropdownContainer: {
    backgroundColor: '#333', // Fundo do container do dropdown
    borderColor: '#444',
  },
  placeholder: {
    color: '#aaa', // Placeholder cinza claro
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff', // Texto branco
  },
});
