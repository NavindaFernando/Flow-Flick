import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import AntDesign from "@expo/vector-icons/AntDesign";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex mt-6 px-4">
            <View className="flex justify-between items-start flex-row mb-1.5">
              <View className="w-[85%]">
                <SearchInput />
              </View>

              <View className="w-[50px] h-[50px] rounded-full border-transparent flex items-center justify-center p-0.5">
                <TouchableOpacity className="flex flex-col gap-1 items-center">
                  <AntDesign name="message1" size={20} color="#BBBDBD" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-full mb-0.5 flex-1">
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Loading..."
            // subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
