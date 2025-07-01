import { Text, View } from "react-native";

const Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                This is the Home screen
            </Text>
        </View>
    );
};

export default Home;