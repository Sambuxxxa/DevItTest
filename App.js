import MainNavigation from "./src/navigation";
import {useFonts} from "expo-font"
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect} from "react";
import {StatusBar} from "expo-status-bar";
import {observer} from "mobx-react-lite";
import AuthStore from "./src/store/AuthStore";
import Toast from "react-native-toast-message";

const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins400': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins500': require('./assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    AuthStore.checkShowAuth()
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <MainNavigation showAuth={AuthStore.showAuth}/>
      <Toast />
      <StatusBar style={"dark"} />
    </>
  );
}

export default observer(App)
