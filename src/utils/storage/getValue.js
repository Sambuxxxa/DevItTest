import AsyncStorage from "@react-native-async-storage/async-storage";

export default async (key, initValue) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      console.log(`--${key} successfully taken ${value}---`)
      return JSON.parse(value);
    } else {
      console.log(`--${key} successfully taken at first---`)
      return typeof initValue === "boolean" ? initValue : initValue ? initValue : null;
    }
  } catch(e) {
    console.log(`ERROR: ${e}`)
  }
}
