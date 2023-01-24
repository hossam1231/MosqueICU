import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function   useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "Oswald-Bold": require("../assets/fonts/Oswald/static/Oswald-Bold.ttf"),
          "Oswald-ExtraLight": require("../assets/fonts/Oswald/static/Oswald-ExtraLight.ttf"),
          "Oswald-Light": require("../assets/fonts/Oswald/static/Oswald-Light.ttf"),
          "Oswald-Medium": require("../assets/fonts/Oswald/static/Oswald-Medium.ttf"),
          "Oswald-Regular": require("../assets/fonts/Oswald/static/Oswald-Regular.ttf"),
          "Oswald-SemiBold": require("../assets/fonts/Oswald/static/Oswald-SemiBold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
