import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-[50px] px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-[#0077B5]">
      <TextInput
        className="text-xs mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Find your favorite video"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-4 h-4" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
