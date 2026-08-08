import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Main/Home";
import AuthStack from "./AuthStack";
import TabNavigation from "./TabNavigation";
import MovieD from "../screens/Main/MovieD";


const Stack = createNativeStackNavigator();


export default function MainNavigation(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="auth" component={AuthStack}/>
            <Stack.Screen name="tab" component={TabNavigation}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="MovieD" component={MovieD}/>
        </Stack.Navigator>
    )
}