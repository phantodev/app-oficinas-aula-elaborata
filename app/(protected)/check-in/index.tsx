import { RelativePathString, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CheckInIndex() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-stone-800">
      <Text className="text-2xl font-bold text-white">Check-In - Passo 1</Text>
      <Button
        title="Próximo"
        onPress={() =>
          router.push("/check-in/check-in-step-2" as RelativePathString)
        }
      />
    </View>
  );
}
