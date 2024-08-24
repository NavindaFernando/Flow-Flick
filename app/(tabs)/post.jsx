import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Create Post</Text>

        <View className="top-2 flex flex-row w-full items-end justify-start">
          <View className="w-[17%] h-16 border-none mr-5 rounded-lg flex justify-center items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="w-full h-full bg-black-100 rounded-full"
              resizeMode="cover"
            />
          </View>

          <FormField
            // title="Video Title"
            value={form.title}
            placeholder="Post title"
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="w-[78%]"
          />
        </View>

        <FormField
          // title="AI Prompt"
          value={form.prompt}
          placeholder="Post description"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          // otherStyles="mt-7"
        />

        <View className="mt-6 space-y-2">

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-64 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 flex justify-center items-center">
                  <Entypo name="upload" size={28} color="#575757" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-6 space-y-2">
          {/* <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text> */}

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Entypo name="upload" size={18} color="#575757" />
                <Text className="text-sm text-[#7B7B8B] font-pmedium">
                  Choose a thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Post"
          handlePress={submit}
          containerStyles="mt-6"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
