import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ListItemType } from '../types/listItemType';

interface FormComponentProps {
  isEdit: boolean;
  itemToEdit?: ListItemType | null;
  handleSave: (task: string) => void;
  handleCancel: () => void;
}

const FormComponent = ({
  isEdit,
  itemToEdit,
  handleSave,
  handleCancel,
}: FormComponentProps) => {
  const [task, setTask] = useState('');

  useEffect(() => {
    setTask(isEdit && itemToEdit ? itemToEdit.name : '');
  }, [isEdit, itemToEdit]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Edit Task' : 'Add Task'}</Text>

      <TextInput
        placeholder="Enter task name"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <View style={styles.buttons}>
        <Button title={isEdit ? 'Update' : 'Save'} onPress={() => handleSave(task)} />
        <Button title="Cancel" onPress={handleCancel} color="gray" />
      </View>
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
