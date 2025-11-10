import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import "react-native-reanimated";
import "../global.css";

// Configurar o logger do Reanimated para reduzir warnings durante desenvolvimento
// Isso resolve o warning sobre ler `value` durante o render
if (__DEV__) {
  configureReanimatedLogger({
    strict: false, // Desabilita o strict mode que causa warnings
    level: ReanimatedLogLevel.warn,
  });
}

export default function RootLayout() {
  // TODO: Adicionar lógica de autenticação aqui
  // Por enquanto, sempre mostra (protected)
  const isAuthenticated = false; // Placeholder

  return (
    <HeroUINativeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="(protected)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </HeroUINativeProvider>
  );
}
