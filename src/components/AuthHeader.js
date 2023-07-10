import {Image, StyleSheet, Text, View} from "react-native";
import {Theme} from "../config/Theme";

export default ({title}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/Logo.png")}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  logo: {
    height: 90,
    width: 67.5,
    marginTop: 50,
    marginBottom: 110
  },
  title: {
    fontSize: 24,
    color: Theme.mainText,
    marginBottom: 20,
    fontFamily: "Poppins500"
  }
})
