import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-[10px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#BBBDBD",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="friends"
          options={{
            title: "Friends",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.friends}
                color={color}
                name="Friends"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="post"
          options={{
            title: "Post",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.post}
                color={color}
                name="Post"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="alerts"
          options={{
            title: "Alerts",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.alerts}
                color={color}
                name="Alerts"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
