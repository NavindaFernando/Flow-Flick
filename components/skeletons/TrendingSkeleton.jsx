import React from "react";
import { View } from "react-native";
import { Skeleton } from "react-native-skeleton-loader";

const TrendingSkeleton = () => {
  return (
    <View className="flex flex-row">
      {[...Array(3)].map((_, index) => (
        <Skeleton
          key={index}
          height={208}
          width={128}
          borderRadius={15}
          className="mr-2"
        />
      ))}
    </View>
  );
};

export default TrendingSkeleton;
