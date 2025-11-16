import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';

const PaginationScreen = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const PAGE_SIZE = 15;
  const TOTAL_COUNT = 100;

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return <Text style={styles.text}>{item}</Text>;
    },
    [data],
  );

  const fetchData = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      let listData = Array.from(
        { length: PAGE_SIZE },
        (_, index) => `Item ${(page - 1) * PAGE_SIZE + index + 1}`,
      );
      setData(prev => [...prev, ...listData]);
      let loadMore = [...data, ...listData].length < TOTAL_COUNT;
      setHasMore(loadMore);
      setLoading(false);
    }, 1000);
  }, [page, data, loading, hasMore]);

  const onEndReached = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setPage(1);
      setHasMore(true);
      setRefreshing(false)
    }, 100);
  }, [refreshing]);
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item}
      ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
      initialNumToRender={10}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    margin: 10,
  },
});

export default PaginationScreen;
