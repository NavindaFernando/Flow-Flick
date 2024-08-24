import React from "react";
import { View } from "react-native";
import { Skeleton } from "react-native-skeleton-loader";

const SearchInputSkeleton = () => {
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-[50px] px-4 bg-black-100 rounded-2xl">
      <Skeleton height={16} width="85%" className="rounded-md" />
      <Skeleton height={16} width={24} className="rounded-md" />
    </View>
  );
};

export default SearchInputSkeleton;
