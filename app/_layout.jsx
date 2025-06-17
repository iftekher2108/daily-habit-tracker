import { Stack } from "expo-router";

const isLogin = false;

export default function RootLayout() {
  return(
  <Stack>
    {/* protect screen */}
    <Stack.Protected guard={isLogin}>
        <Stack.Screen name="(tabs)" options={{ title:"this is counter app" }} />
    </Stack.Protected>
    
    {/* none protect screen */}
    <Stack.Protected guard={!isLogin}>
      <Stack.Screen name="login" />
    </Stack.Protected>
    
  </Stack>
  );
}
