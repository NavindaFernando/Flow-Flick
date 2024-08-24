import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Friends = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Friends</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;
