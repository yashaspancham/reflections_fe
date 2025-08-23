import { View, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { oldEntryT } from "@/utiles/types";
import {
  allEntries,
  getEntriesWithPagination,
} from "@/utiles/apis/entries/entries";
import { useSelector } from "react-redux";
import { RootState } from "@/utiles/redux/store";
import Toast from "react-native-toast-message";
import Entry from "@/components/Entry";

const EntriesComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [dataPresent, setDataPresent] = useState(0); // 0 = loading, 1 = data, 2 = no data
  const [entries, setEntries] = useState<oldEntryT[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const user_id = useSelector((state: RootState) => state.auth.user_id);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoaded(true);
        if (user_id != null) {
          getEntriesWithPagination(user_id, page).then((res: any) => {
            if (res.success === false) {
              Toast.show({
                type: "error",
                text1: res.message,
              });
            } else {
              setEntries(prev => Array.from(new Map([...prev, ...res.data].map(item => [item.entry_id, item])).values()));
              setDataPresent(res.data.length === 0 ? 2 : 1);
              setPage((prevPage) => prevPage + 1);
            }
          });
        }
      };
      loadData();
    }, [user_id])
  );

  const handleEndOfPage = () => {
    if (loaded && entries && entries.length >= 10 && !loading && hasMore) {
      setLoading(true);
      if (user_id != null) {
        getEntriesWithPagination(user_id, page).then((res: any) => {
          if (res.success === false) {
            Toast.show({
              type: "error",
              text1: res.message,
            });
          } else {
            setLoading(false);
            if (res.data.length === 0) {
              setHasMore(false);
            }
            setEntries(prev => [...prev, ...res.data]);
            setPage((prevPage) => prevPage + 1);
          }
        });
      }
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 0 }}>
      {dataPresent === 0 && (
        <ActivityIndicator
          size="large"
          animating={true}
          style={{ paddingTop: 100 }}
        />
      )}

      {dataPresent === 1 && (
        <FlatList
          data={entries}
          renderItem={({ item, index }) => <Entry item={item} index={index} />}
          keyExtractor={(item) => item.entry_id.toString()}
          onEndReached={() => { hasMore ? handleEndOfPage() : {} }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator animating={true} /> : null
          }
        />
      )}

      {dataPresent === 2 && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text variant="headlineLarge" style={{ paddingTop: 100 }}>
            No entries
          </Text>
        </View>
      )}
    </View>
  );
};

export default EntriesComponent;
