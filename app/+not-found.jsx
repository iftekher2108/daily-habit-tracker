import { View, Text, StyleSheet } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

export default NotFound = () => {
    return(
        <SafeAreaView>
            <View>
                <Text style={styles.Title}>
                    Not Found
                </Text>
                <Text style={styles.subTitle}>
                    Go Back Next Page
                </Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    Title:{
        color:"white",
        backgroundColor:"#FF4F0F",
        fontSize: 30,
        padding: 30,
    },
    subTitle: {
        color: "#fff"
    }
})
