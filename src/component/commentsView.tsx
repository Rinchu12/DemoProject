import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CommentsDataType } from '../types/listItemType';

interface CommentsProps {
  item: CommentsDataType;
  onTap?: (id: number) => void;
}
const CommentsView = ({ item, onTap }: CommentsProps) => {
  return (
    <Pressable style={styles.container}
      onPress={() => {
        if (onTap && (item.postId || item.id)) {
          console.log("id=======", item)
          onTap(item.postId || item.id || 1);
        }
      }}
    >
      <Text>{item.id ?? ''}</Text>
      <Text>{item.userId ?? ''}</Text>
      <Text>{item.postId ?? ''}</Text>
      <Text>{item.name ?? ''}</Text>
      <Text>{item.email ?? ''}</Text>
      <Text>{item.body ?? ''}</Text>
      <Text>{item.title ?? ''}</Text>
      <Text>{item.completed ?? ''}</Text>
    </Pressable>
  );
};

export default CommentsView;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderWidth:2,
    borderColor: 'green',
    borderRadius: 10
  },
  text:{

  }
})
