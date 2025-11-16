import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ListItemType } from '../../types/listItemType';
import { useEffect, useState } from 'react';

interface FormScrenprops {
  isEdit: boolean;
  itemToEdit?: ListItemType | null;
  handleSave: (task: string) => void;
  handleCancel: () => void;
}
export const FormScreen = ({
  isEdit,
  itemToEdit,
  handleSave,
  handleCancel,
}: FormScrenprops) => {
  const [task, setTask] = useState<string>('');
  useEffect(() => {
    setTask(isEdit && itemToEdit ? itemToEdit.name : '');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>{isEdit ? 'Edit task' : 'Add Task'}</Text>
        <TextInput
          style={styles.textInput}
          value={task}
          onChangeText={setTask}
          placeholder="Enter Task"
        />
        <View style={styles.buttonContainer}>
          <Button
            title={isEdit ? 'Update' : 'Save'}
            onPress={() => handleSave(task)}
          />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    rowGap: 20,
  },

  textInput: {
    color: 'black',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
