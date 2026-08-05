import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUp from "../screens/Auth/SignUp";
import OTP from "../screens/Auth/OTP";
import Username from "../screens/Auth/Username";

const Stack = createNativeStackNavigator();

export default function AuthStack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown:false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignUp}/>
            <Stack.Screen name="otp" component={OTP}/>
            <Stack.Screen name="username" component={Username}/>
        </Stack.Navigator>
    )
}