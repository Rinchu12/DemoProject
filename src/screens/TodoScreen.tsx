import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { ListItemType } from '../types/listItemType';
import FormComponent from '../component/form';
import ListItem from '../component/listItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../constants/constants';

const TodoScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskList, setTaskList] = useState<ListItemType[]>([]);
  const [itemToEdit, setItemToEdit] = useState<ListItemType | null>(null);

  // ✅ Load tasks from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) setTaskList(JSON.parse(storedData));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    })();
  }, []);

  // ✅ Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(taskList)).catch(err =>
      console.error('Error saving tasks:', err),
    );
  }, [taskList]);

  // ✅ Toggle completion using functional state updates
  const toggleTaskCompletion = useCallback((id: string) => {
    setTaskList(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }, []);

  // ✅ Add or Edit task efficiently
  const handleSave = useCallback(
    (taskName: string) => {
      if (!taskName.trim()) return;

      setTaskList(prev => {
        if (isEdit && itemToEdit) {
          // Edit existing task
          return prev.map(task =>
            task.id !== itemToEdit.id ? { ...task, name: taskName } : task,
          );
        }
        // Add new task
        return [
          ...prev,
          { id: Date.now().toString(), name: taskName, isCompleted: false },
        ];
      });

      setShowForm(false);
      setIsEdit(false);
      setItemToEdit(null);
    },
    [isEdit, itemToEdit],
  );

  // ✅ Delete handler
  const handleDelete = useCallback((id: string) => {
    setTaskList(prev => prev.filter(task => task.id !== id));
  }, []);

  // ✅ Open form for Add/Edit
  const handleAddTask = useCallback(() => {
    setItemToEdit(null);
    setIsEdit(false);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((item: ListItemType) => {
    setItemToEdit(item);
    setIsEdit(true);
    setShowForm(true);
  }, []);

  // ✅ Memoized renderItem (avoids re-rendering FlatList rows)
  const renderItem = useCallback(
    ({ item }: { item: ListItemType }) => (
      <ListItem
        item={item}
        onPress={() => toggleTaskCompletion(item.id)}
        handleDelete={() => handleDelete(item.id)}
        handleEdit={() => handleEdit(item)}
      />
    ),
    [toggleTaskCompletion, handleDelete, handleEdit],
  );

  // ✅ Use useMemo to avoid unnecessary list recalculation
  const taskKeyExtractor = useCallback((item: ListItemType) => item.id, []);

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={handleAddTask} />

      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={taskKeyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {showForm && (
        <FormComponent
          isEdit={isEdit}
          itemToEdit={itemToEdit}
          handleSave={handleSave}
          handleCancel={() => setShowForm(false)}
        />
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
