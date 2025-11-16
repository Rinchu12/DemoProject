import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PostsType } from '../types/listItemType';

const DataListScreen = () => {
  const [dataList, setDataList] = useState<PostsType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
   const [debouncedQuery, setDebouncedQuery] = useState<string>(''); 

  useEffect(() => {
    fetchData();
  }, []);

    // ✅ Debounce effect (waits for user to stop typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400); // waits 400ms after user stops typing

    return () => clearTimeout(handler); // cleanup timeout
  }, [searchQuery]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      console.warn(response.data);
      setDataList(response.data);
    } catch {
      Alert.alert('ERROORRRRRR');
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: PostsType }) => (
        <View style={styles.itemContainer}>
      <Text style={[styles.itemText, item.completed && styles.completedText]}>
        {item.title}
      </Text>
      </View>
    ),
    [],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setDataList([]);
    await fetchData(); // re-fetch tasks from AsyncStorage
    setTimeout(() => setRefreshing(false), 800); // smooth UX delay
  }, []);

  const taskKeyExtractor = useCallback(
    (item: PostsType) => `${Date.now()}${item.userId} ${item.title}`,
    [],
  );

    // ✅ Filtered data based on search input
  const filteredData = useMemo(() => {
    return dataList.filter(item =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [dataList, debouncedQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={taskKeyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
    itemContainer: {
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
   emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default DataListScreen;
