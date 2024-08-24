import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-5">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[50px] h-[50px] border-transparent rounded-full border flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex items-center h-[50px] justify-center"
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text
            className={`text-xs font-pregular ${
              isFollowing ? "text-gray-400" : "text-[#1bafff]"
            }`}
            numberOfLines={1}
          >
            {isFollowing ? "Following" : "+ Follow"}
          </Text>
        </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
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
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <View className="flex flex-row justify-around w-full mt-5">
        <TouchableOpacity className="flex flex-col gap-1 items-center">
          <EvilIcons name="like" size={28} color="#BBBDBD" />
          <Text className="text-xs text-[#BBBDBD]">Like</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-col gap-1 items-center">
          <EvilIcons name="comment" size={28} color="#BBBDBD" />
          <Text className="text-xs text-[#BBBDBD]">Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-col gap-1 items-center">
          <EvilIcons name="redo" size={28} color="#BBBDBD" />
          <Text className="text-xs text-[#BBBDBD]">Repost</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-col gap-1 items-center">
          <EvilIcons name="share-google" size={28} color="#BBBDBD" />
          <Text className="text-xs text-[#BBBDBD]">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCard;
