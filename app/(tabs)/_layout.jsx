import { FontAwesome } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default TabLayout = () => {
    return(
        <Tabs screenOptions={{ headerShown : false,
            
            tabBarStyle:{
                backgroundColor:"#3674B5",
                padding: 20,
            },
            tabBarActiveTintColor:'#fff',
            tabBarInactiveTintColor:'#131D4F'

        }}>
            <Tabs.Screen name="home" options={{ title: "Home", href:"/home",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
             }} />
            <Tabs.Screen  name="setting" options={{ title: "Setting", href:"/setting",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
             }} />
        </Tabs>
    )
}


