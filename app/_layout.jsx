import { Stack } from "expo-router";
import { ThemeProvider } from "../src/config/ThemeContext";


const isLogin = false;

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        {/* Unprotected screen: show login if not logged in */}
        {/* <Stack.Protected guard={!isLogin}> */}
          <Stack.Screen name="login" options={{ title: "Login" }} />
        {/* </Stack.Protected> */}
        {/* Protected screen: show tabs if logged in */}
        {/* <Stack.Protected guard={isLogin}> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "this is counter app" }} />
        {/* </Stack.Protected> */}
        {/* <Stack.Screen name="+not-found" options={{ headerShown: false, title: "page not found" }} /> */}
      </Stack>
    </ThemeProvider>
  );
}
