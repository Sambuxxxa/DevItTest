import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import EditProfileScreen from "../screens/EditProfileScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();
const MainNavigation = ({showAuth}) => {
  return (
    <NavigationContainer>
      {
        showAuth ?
          <Stack.Navigator>
            <Stack.Screen name="LogInScreen" component={LogInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
          </Stack.Navigator> :
          <Stack.Navigator>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{headerShown: false}}/>
          </Stack.Navigator>
      }
    </NavigationContainer>
  )
};

export default MainNavigation;
