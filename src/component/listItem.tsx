import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { ListItemType } from '../types/listItemType';

interface ListItemProps {
  item: ListItemType;
  onPress: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
}

const ListItem = React.memo(({ item, onPress, handleDelete, handleEdit }: ListItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <Text
          style={[
            styles.itemText,
            item.isCompleted && styles.completedText,
          ]}
        >
          {item.name}
        </Text>
      </Pressable>

      <View style={styles.buttons}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
});
