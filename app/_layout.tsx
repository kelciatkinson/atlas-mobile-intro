import { Stack } from "expo-router";
import { ActivitiesProvider } from "@/components/ActivitiesProvider";
import { DatabaseProvider } from "@/components/DatabaseProvider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
   return (
    <DatabaseProvider>
      <ActivitiesProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="add-activity-screen" options={{ headerShown: false }}/>
          </Stack>
        </GestureHandlerRootView>
      </ActivitiesProvider>
    </DatabaseProvider>
  );
}
