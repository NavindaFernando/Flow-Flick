import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Alerts = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Alerts</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Alerts;
