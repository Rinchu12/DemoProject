import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useFetch } from '../Hooks/usefetch';
import { ENDPOINTS } from '../constants/constants';
import {
  CommentsDataType,
  CommentScreenType,
  RootStackParamList,
} from '../types/listItemType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CommentsView from '../component/commentsView';
import { useCallback } from 'react';

type CommentsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Comments'
>;
const CommentsScreen = ({ navigation, route }: CommentsScreenProps) => {
  const { id = null, type } = route.params;

  const isPost = type === CommentScreenType.Post;
  const isPostComments = type === CommentScreenType.PostComments;
  const isPostIdComments = type === CommentScreenType.PostIdComments;

  const {
    data: singlePost,
    loading: loadingPost,
    error: errorPost,
  } = useFetch<CommentsDataType>(ENDPOINTS.USER_POST(id), isPost);

  const {
    data: postCommentsData,
    loading: loadingComments,
    error: errorComments,
  } = useFetch<CommentsDataType[]>(ENDPOINTS.POST_COMMENTS(id), isPostComments);

  const {
    data: postIdComments,
    loading: loadingIdComments,
    error: errorIdComments,
  } = useFetch<CommentsDataType[]>(
    ENDPOINTS.COMMENTS_POSTID(id),
    isPostIdComments,
  );

  // ---------- LOADING ----------
  if (loadingPost || loadingComments || loadingIdComments) {
    return <ActivityIndicator />;
  }

  // ---------- ERROR ----------
  const finalError = errorPost || errorComments || errorIdComments;
  if (finalError) {
    return <Text>{finalError}</Text>;
  }

  // ---------- NO RECORDS ----------

  // ---------- Single Post View ----------
  if (type === CommentScreenType.Post) {
    if (!singlePost) return <Text>No Record with id: {id}</Text>;

    return (
      <CommentsView
        item={{
          userId: singlePost.userId!,
          id: singlePost.id!,
          title: singlePost.title!,
          body: singlePost.body!,
        }}
        onTap={() =>
          navigation.navigate('Comments', {
            id: singlePost.id,
            type: CommentScreenType.PostComments,
          })
        }
      />
    );
  }

  // ---------- Comments List ----------
  const finalList = postCommentsData || postIdComments;
  if (!finalList || finalList.length === 0) {
    return <Text>No Comments Found</Text>;
  }

  const renderItem = useCallback(
    ({ item }: { item: CommentsDataType }) => (
      <CommentsView
        item={{
          userId: item.userId,
          id: item.id,
          title: item.name,
          body: item.body,
        }}
        onTap={() =>
          navigation.navigate('Comments', {
            id: item.postId,
            type: CommentScreenType.PostIdComments,
          })
        }
      />
    ),
    [],
  );

  return (
    <FlatList
      data={finalList}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}-${item.email}`}
    />
  );
};

export default CommentsScreen;
