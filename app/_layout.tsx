import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";
import { ReactQueryProvider } from "../providers/ReactQueryProvider";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>
        <HeroUINativeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <Stack.Screen name="(protected)" />
            ) : (
              <Stack.Screen name="(auth)" />
            )}
          </Stack>
        </HeroUINativeProvider>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
}
