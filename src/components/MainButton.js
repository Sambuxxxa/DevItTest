import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Theme} from "../config/Theme";

const size = Dimensions.get("screen").width - 64
const MainButton = ({title = "", onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: size,
    marginHorizontal: 32,
    backgroundColor: Theme.accent,
    height: 62,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  title: {
    color: Theme.mainText,
    fontSize: 18,
    fontFamily: "Poppins500"
  }
})

export default MainButton;
