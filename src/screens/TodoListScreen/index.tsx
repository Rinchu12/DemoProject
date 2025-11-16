import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, FlatList, View } from 'react-native';
import { ListItemType, PostsType } from '../../types/listItemType';
import ListItemComponent from './listItemComponent';
import { FormScreen } from './formScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../../constants/constants';

export const TodoListScreen = () => {
  const [list, setList] = useState<ListItemType[]>([]);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<ListItemType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let taskList = await AsyncStorage.getItem(STORAGE_KEY);
        if (taskList) {
          let storaedData = JSON.parse(taskList);
          setList(storaedData);
        }
      } catch {
        Alert.alert('Error fetching stored Data');
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list)).catch(
      () => console.log,
    );
  }, [list]);

  const addTask = useCallback(() => {
    setShowForm(true);
    setisEdit(false);
    setItemToEdit(null);
  }, []);

  const toggleTaskCompletion = useCallback(
    (id: string) => {
      let updatedValue = list.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      );
      setList(updatedValue);
    },
    [list],
  );

  const handleDelete = useCallback(
    (id: string) => {
      let upadtedValue = list.filter(item => item.id !== id);
      setList(upadtedValue);
    },
    [list]
  );



  const handleEdit = useCallback(
    (item: ListItemType) => {
      setItemToEdit(item);
      setisEdit(true);
      setShowForm(true);
    },
    [itemToEdit],
  );

  const renderItem = useCallback(
    ({ item }: { item: ListItemType }) => (
      <ListItemComponent
        item={item}
        onTap={toggleTaskCompletion}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ),
    [handleDelete, handleEdit, toggleTaskCompletion],
  );

  const handleSave = useCallback(
    (taskName: string) => {
      if (!taskName.trim()) return;
      setList(prev => {
        if (isEdit && itemToEdit) {
          return prev.map(item =>
            item.id === itemToEdit.id ? { ...item, name: taskName } : item,
          );
        } else {
          return [
            ...prev,
            { id: Date.now().toString(), name: taskName, isCompleted: false },
          ];
        }
      });

      setShowForm(false);
      setItemToEdit(null);
      setisEdit(false);
    },
    [isEdit, itemToEdit],
  );

  const taskKeyExtractor = useCallback((item: ListItemType) => item.id, []);
  return (
    <View style={{paddingHorizontal: 10, flex:1 }}>
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={taskKeyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {showForm && (
        <FormScreen
          isEdit={isEdit}
          itemToEdit={itemToEdit}
          handleSave={handleSave}
          handleCancel={() => setShowForm(false)}
        />
      )}
    </View>
  );
};
