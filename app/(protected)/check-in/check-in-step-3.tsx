import { useMainStore } from "@/store/useMain.store";
import Feather from "@expo/vector-icons/Feather";
import { RelativePathString, useRouter } from "expo-router";
import { Button, TextField } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const FUEL_LEVELS = [
  { label: "0", value: 0 },
  { label: "1/4", value: 1 },
  { label: "1/2", value: 2 },
  { label: "3/4", value: 3 },
  { label: "Full", value: 4 },
];

export default function CheckIn3Page() {
  const router = useRouter();
  const { setCheckInStep3Data } = useMainStore();
  const [objetosPessoais, setObjetosPessoais] = useState("");
  const [nivelCombustivel, setNivelCombustivel] = useState(2); // Inicia em 1/2
  const [sliderWidth, setSliderWidth] = useState(0);
  const translateX = useSharedValue(0);
  const fuelLevel = useSharedValue(2); // Inicia em 1/2

  const handleNextStep = () => {
    setCheckInStep3Data({
      objetosPessoais,
      nivelCombustivel,
    });
    router.push("/check-in/check-in-step-4" as RelativePathString);
  };

  const updateFuelLevel = (x: number) => {
    if (sliderWidth === 0) return;
    const percentage = Math.max(0, Math.min(1, x / sliderWidth));
    const newValue = Math.round(percentage * 4);
    setNivelCombustivel(newValue);
    fuelLevel.value = newValue;
    const newX = (newValue / 4) * sliderWidth;
    translateX.value = withSpring(newX, { damping: 15, stiffness: 150 });
  };

  const handleSliderPress = (evt: any) => {
    if (sliderWidth === 0) return;
    const touchX = evt.nativeEvent.locationX;
    updateFuelLevel(touchX);
  };

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      if (sliderWidth === 0) return;
      const startX = Math.max(0, Math.min(sliderWidth, e.x));
      translateX.value = startX;
      runOnJS(updateFuelLevel)(startX);
    })
    .onUpdate((e) => {
      if (sliderWidth === 0) return;
      const newX = Math.max(0, Math.min(sliderWidth, e.x));
      translateX.value = newX;
      runOnJS(updateFuelLevel)(newX);
    })
    .onEnd(() => {
      if (sliderWidth > 0) {
        const finalX = Math.max(0, Math.min(sliderWidth, translateX.value));
        const snapX =
          (Math.round((finalX / sliderWidth) * 4) / 4) * sliderWidth;
        translateX.value = withSpring(snapX, { damping: 15, stiffness: 150 });
        runOnJS(updateFuelLevel)(snapX);
      }
    });

  return (
    <ScrollView
      className="flex-1 bg-stone-800"
      contentContainerClassName="px-6 py-8"
      keyboardShouldPersistTaps="handled"
    >
      <View className="w-full max-w-md mx-auto pb-10">
        {/* Título */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Text className="text-3xl font-bold text-white">
              Detalhes finais
            </Text>
            <Text className="text-2xl ml-2">🚀</Text>
          </View>
          <Text className="text-sm text-white/80">
            Para fechar a entrada do automóvel em sua oficina, preencha as
            informações abaixo.
          </Text>
        </View>

        {/* Campo de Objetos Pessoais */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-white mb-3">
            Tem objetos pessoais no interior?
          </Text>
          <View className="relative">
            <TextField className="w-full">
              <TextField.Input
                placeholder="Liste os objetos pessoais encontrados no veículo..."
                value={objetosPessoais}
                onChangeText={setObjetosPessoais}
                multiline
                numberOfLines={6}
                className="min-h-[150px] text-base"
                textAlignVertical="top"
              />
            </TextField>
            <TouchableOpacity
              className="absolute top-3 right-3 p-2"
              activeOpacity={0.7}
              onPress={() => {
                // TODO: Implementar funcionalidade de voz
                console.log("Microfone pressionado");
              }}
            >
              <Feather name="mic" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Slider de Combustível */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-white mb-4">
            Quanto de combustível tem no tanque?
          </Text>

          {/* Slider Container */}
          <View className="mb-4">
            <View
              className="relative"
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setSliderWidth(width);
                const initialX = (nivelCombustivel / 4) * width;
                translateX.value = initialX;
                fuelLevel.value = nivelCombustivel;
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleSliderPress}
                className="py-2"
              >
                <View
                  className="h-2 bg-gray-600 rounded-full"
                  style={{ width: "100%" }}
                >
                  {/* Track preenchido */}
                  <Animated.View
                    className="h-full bg-blue-600 rounded-full absolute left-0"
                    style={useAnimatedStyle(() => {
                      if (sliderWidth > 0) {
                        return {
                          width: Math.max(
                            0,
                            Math.min(translateX.value, sliderWidth)
                          ),
                        };
                      }
                      // Fallback quando sliderWidth ainda não foi calculado
                      const percentage = (fuelLevel.value / 4) * 100;
                      return {
                        width: `${percentage}%`,
                      };
                    })}
                  />
                </View>
              </TouchableOpacity>
              {/* Handle */}
              <GestureDetector gesture={panGesture}>
                <Animated.View
                  className="absolute top-1/2 w-6 h-6 bg-blue-600 rounded-full border-2 border-white z-10"
                  style={useAnimatedStyle(() => {
                    if (sliderWidth > 0) {
                      return {
                        left: Math.max(
                          0,
                          Math.min(translateX.value - 12, sliderWidth - 12)
                        ),
                        marginTop: -12,
                      };
                    }
                    // Fallback quando sliderWidth ainda não foi calculado
                    const percentage = (fuelLevel.value / 4) * 100;
                    const fallbackWidth = 300;
                    return {
                      left: Math.max(
                        0,
                        Math.min(
                          (percentage / 100) * fallbackWidth - 12,
                          fallbackWidth - 12
                        )
                      ),
                      marginTop: -12,
                    };
                  })}
                />
              </GestureDetector>
            </View>
          </View>

          {/* Labels */}
          <View className="flex-row justify-between px-1">
            {FUEL_LEVELS.map((level) => (
              <TouchableOpacity
                key={level.value}
                onPress={() => {
                  setNivelCombustivel(level.value);
                  fuelLevel.value = level.value;
                  if (sliderWidth > 0) {
                    const newX = (level.value / 4) * sliderWidth;
                    translateX.value = withSpring(newX, {
                      damping: 15,
                      stiffness: 150,
                    });
                  }
                }}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-sm ${
                    nivelCombustivel === level.value
                      ? "text-blue-400 font-semibold"
                      : "text-white/60"
                  }`}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão Próximo */}
        <View className="mt-6">
          <Button onPress={handleNextStep} className="w-full">
            Próximo
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
