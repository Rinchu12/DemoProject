import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useFetch } from '../Hooks/usefetch';
import { ENDPOINTS } from '../constants/constants';
import { useCallback } from 'react';
import {
  CommentsDataType,
  CommentScreenType,
  RootStackParamList,
} from '../types/listItemType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CommentsView from '../component/commentsView';
type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'Post'>;
const PostScreen = ({ navigation }: PostScreenProps) => {
  const { data, error, loading } = useFetch<CommentsDataType[]>(
    ENDPOINTS.POSTS,
  );

  const renderItem = useCallback(
    ({ item }: { item: CommentsDataType }) => (
      <View>
        <CommentsView
          item={{
            userId: item.userId,
            id: item.id,
            title: item.title,
            body: item.body,
          }}
          onTap={() =>
            navigation.navigate('Comments', {
              id: item.id,
              type: CommentScreenType.Post,
            })
          }
        />

      </View>
    ),
    [], // add navigation dependency
  );

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!data) return <Text>No Records Found</Text>;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id?.toString() ?? ''}
    />
  );
};

export default PostScreen;
