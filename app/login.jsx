import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default Login = () => {
  return (
    <SafeAreaView style={style.mainContainer}>
      <View style={style.container}>
        <Text style={style.title}>
            This is Login Form
        </Text>
        <Text style={style.text}>
            you have to login here 
        </Text>

         <TextInput placeholderTextColor={"#fff"} style={style.textInput} placeholder="Enter your name" />
      
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#131D4F",
        height:"100%"
    },
    container: {
        flexDirection:'column',
        alignItems: 'center',
        margin: 20,
    },
    title: {
        color:'#fff',
        fontSize: 30,
        fontWeight: '800'

    },
    text: {
        color:"#fff",
        fontSize: 16,
        fontWeight:'300'
    },
    textInput: {
        color: "#fff",
        borderWidth: 2,
        borderColor:"#fff",
         width:"100%",
         height:60,
          padding: 10,
          borderRadius: 10
    }
})
