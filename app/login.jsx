import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = () => {
    if (validate()) {
      // Optionally show a success message
      // Alert.alert("Login Success", `Welcome, ${email}!");
      router.replace("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.container}>
        <Text style={style.title}>Login</Text>
        <Text style={style.text}>Please enter your credentials to login.</Text>

        <TextInput
          placeholderTextColor="#aaa"
          style={style.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholderTextColor="#aaa"
          style={style.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={style.error}>{error}</Text> : null}

        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login
const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#131D4F",
    flex: 1,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 20,
  },
  textInput: {
    color: "#fff",
    borderWidth: 2,
    borderColor: "#fff",
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  button: {
    backgroundColor: "#3674B5",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  error: {
    color: "#FF4F0F",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "flex-start",
  },
});
