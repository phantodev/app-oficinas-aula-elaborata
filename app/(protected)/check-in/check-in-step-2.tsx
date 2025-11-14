import { CameraModal } from "@/components/camera-modal";
import { useMainStore } from "@/store/useMain.store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function CheckIn2Page() {
  const router = useRouter();
  const [mediaList, setMediaList] = useState<string[]>([]);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

  const { vehicleData } = useMainStore();

  useEffect(() => {
    console.log(vehicleData);
  }, []);

  const handlePhotoTaken = (uri: string) => {
    setMediaList((prev) => [...prev, uri]);
    console.log("Foto capturada:", uri);
  };

  const handleVideoRecorded = (uri: string) => {
    setMediaList((prev) => [...prev, uri]);
    console.log("Vídeo gravado:", uri);
  };

  return (
    <View className="flex-1 items-center justify-center bg-stone-800 px-6">
      {mediaList.length === 0 ? (
        <>
          <Image
            source={require("@/assets/images/camera-icon.png")}
            style={{ width: 220, height: 220 }}
            contentFit="contain"
          />
          <Text className="text-2xl font-bold text-white mt-2 mb-4">
            Upload de media
          </Text>
          <Text className="text-base text-white text-center">
            Analise o automóvel inteiro e verifique se existe alguma avaria
            externamente e internamente. Tire fotos ou grave videos.
          </Text>
        </>
      ) : (
        <View className="flex-row flex-wrap gap-4 w-full px-6">
          <View className="w-1/3 aspect-square bg-red-500" />
          <View className="w-1/3 aspect-square bg-blue-500" />
          <View className="w-1/3 aspect-square bg-green-500" />
        </View>
      )}
      <Button
        className="w-full mt-4"
        onPress={() => setIsCameraModalVisible(true)}
      >
        Adicionar mídia
      </Button>
      <Button
        className="w-full mt-4"
        isDisabled={mediaList.length === 0}
        onPress={() => console.log("vehicleData", vehicleData)}
      >
        Próximo
      </Button>

      <CameraModal
        visible={isCameraModalVisible}
        onClose={() => setIsCameraModalVisible(false)}
        onPhotoTaken={handlePhotoTaken}
        onVideoRecorded={handleVideoRecorded}
      />
    </View>
  );
}
