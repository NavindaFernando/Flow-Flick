import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const [menuVisible, setMenuVisible] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const clickedMenu = () => {
    setMenuVisible(!menuVisible);
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
        ListEmptyComponent={() => (
          <EmptyState
            // title="No Videos Found"
            title="Loading..."
            // subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={clickedMenu}
              className="flex w-full items-end mb-5"
            >
              <Image
                source={icons.menu}
                resizeMode="contain"
                className="w-5 h-5"
              />
            </TouchableOpacity>

            {menuVisible && (
              <View className="absolute right-4 top-10 bg-black-100 rounded-lg shadow-lg w-48 z-50">
                <TouchableOpacity
                  // onPress={settings}
                  className="flex flex-row gap-3 w-full p-3 items-center"
                >
                  <Ionicons name="settings-outline" size={24} color="#7B7B8B" />
                  <Text className="text-gray-100 font-pregular text-sm">
                    Settings
                  </Text>
                </TouchableOpacity>

                <View className="border-b border-[#3a3a3a]"></View>

                <TouchableOpacity
                  className="flex flex-row gap-3 p-3 w-full items-center"
                  onPress={logout}
                >
                  <Image
                    source={icons.logout}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                  <Text className="text-gray-100 font-pregular text-sm">
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-5"
            >

              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity> */}

            <View className="w-24 h-24 border border-transparent rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-md"
            />

            <View className="mt-1 flex flex-row">
              <InfoBox
                title="780"
                subtitle="Following"
                titleStyles="text-lg"
                containerStyles="mr-10"
              />

              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-lg"
                containerStyles="mr-10"
              />

              <InfoBox
                title="19.5K"
                subtitle="Followers"
                titleStyles="text-lg"
              />
            </View>

            <View className="mt-7 flex flex-row">
              <Text className="text-xs text-gray-100 text-center font-pregular">
                🖇️ associate software engineer{"\n"}📌
                m.navindafernando@gmail.com
                {"\n"}🎓 ijse gdse_57 p_1413
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
