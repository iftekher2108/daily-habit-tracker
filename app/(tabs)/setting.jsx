import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../../src/config/ThemeContext";

const Setting = () => {
  const { theme, toggleTheme, themeObject } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeObject.background }]}> 
      <Text style={[styles.title, { color: themeObject.text }]}>Theme Settings</Text>
      <View style={styles.row}>
        <Text style={{ color: themeObject.text }}>Dark Mode</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          thumbColor={theme === "dark" ? "#3674B5" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default Setting;
