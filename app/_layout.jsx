import { Stack } from "expo-router";
import { ThemeProvider } from "../src/config/ThemeContext";

const isLogin = true;

export default function RootLayout() {
  return(
    <ThemeProvider>
      <Stack>
        {/* protect screen */}
        <Stack.Protected guard={isLogin}>
            <Stack.Screen name="(tabs)" options={{ headerShown:false, title:"this is counter app" }} />
        </Stack.Protected>
        {/* none protect screen */}
        <Stack.Protected guard={!isLogin}>
          <Stack.Screen name="login" options={{ title: "Login" }} />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
