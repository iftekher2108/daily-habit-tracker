import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";


const NotFound = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FF4F0F' }}>
            <View style={styles.container}>
                <Text style={styles.Title}>
                    Not Found
                </Text>
                <Text style={styles.subTitle}>
                    Go Back Next Page
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default NotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Title: {
        color: "white",
        backgroundColor: "#FF4F0F",
        fontSize: 30,
        padding: 30,
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        marginBottom: 20,
    },
    subTitle: {
        color: "#fff",
        fontSize: 18,
        textAlign: 'center',
        opacity: 0.8,
    },
});
