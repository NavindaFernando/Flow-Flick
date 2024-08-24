import React from "react";
import { View } from "react-native";
import { Skeleton } from "react-native-skeleton-loader";

const VideoCardSkeleton = () => {
  return (
    <View className="flex flex-col items-center px-4 mb-8">
      <View className="flex flex-row gap-3 items-start">
        <Skeleton height={50} width={50} borderRadius={25} />
        <View className="flex-1 ml-3 gap-y-1">
          <View height={16} width="60%" className="rounded-md" />
          <View height={12} width="40%" className="rounded-md mt-1" />
        </View>
        <View height={16} width={60} className="rounded-md" />
      </View>
      <View height={240} width="100%" className="rounded-xl mt-3" />
    </View>
  );
};

export default VideoCardSkeleton;
