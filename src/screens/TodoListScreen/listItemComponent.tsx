import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { ListItemType, PostsType } from '../../types/listItemType';

interface ListComponentProps {
  item: ListItemType;
  onTap: (id: string) => void;
  handleEdit: (item: ListItemType) => void;
  handleDelete: (id: string) => void;
}
const ListItemComponent = React.memo(
  ({ item, onTap, handleEdit, handleDelete }: ListComponentProps) => (
    <Pressable style={styles.container} onPress={() => onTap(item.id)}>
    
        <Text style={[styles.text, item.isCompleted && styles.completed]}>
          {item.name}
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => handleEdit(item)} />
          <Button title="Delete" onPress={() => handleDelete(item.id)} />
        </View>
    
    </Pressable>
  ),
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'green',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap:10
  },
});

export default ListItemComponent;
