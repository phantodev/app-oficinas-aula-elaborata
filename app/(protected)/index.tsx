import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Bem-vindo!</Text>
      <Text className="mt-4 text-gray-600">
        Esta é a tela principal após o login
      </Text>
    </View>
  );
}
