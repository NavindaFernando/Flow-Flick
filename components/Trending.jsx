import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { icons } from "../constants";

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className="mr-2" duration={500}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-32 h-52 rounded-[15px] mt-5 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-32 h-52 rounded-[15px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <View className="w-[40px] h-[40px] absolute top-6 left-1 rounded-full border-2 border-[#0077B5] p-0.5 m-1">
            <Image
              source={{ uri: item.creator.avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="w-full absolute px-1.5 bottom-6">
            <Text
              className="text-xs text-white font-pregular"
              numberOfLines={2}
            >
              {item.creator.username}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
    />
  );
};

export default Trending;
