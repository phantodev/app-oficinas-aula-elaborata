import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Tela de Login</Text>
      <Link href="/(auth)/cadastro" className="mt-4 text-blue-500">
        Ir para Cadastro
      </Link>
      <Link href="/(auth)/esqueci-senha" className="mt-2 text-blue-500">
        Esqueci minha senha
      </Link>
    </View>
  );
}
