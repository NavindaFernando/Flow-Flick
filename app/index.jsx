import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/sign-in");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.flowflick}
            className="w-36"
            resizeMode="contain"
          />

          <Text className="text-xs font-pregular text-gray-500 mt-44 text-center">
            from
          </Text>

          <Text className="text-sm font-psemibold text-gray-400 text-center">
            GDSE57
          </Text>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
