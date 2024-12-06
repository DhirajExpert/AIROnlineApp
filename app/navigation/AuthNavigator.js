import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen';
import ResetPassword from '../screens/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function AuthNavigator(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name="SignIn" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ResetPassword} />
        </Stack.Navigator>
    )
}
