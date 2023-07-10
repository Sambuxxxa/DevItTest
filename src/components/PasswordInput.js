import {Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Theme} from "../config/Theme";
import {useRef, useState} from "react";

const PasswordInput = ({value, onChange, placeholder = ""}) => {
  const inpRef = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <Pressable onPress={() => inpRef?.current?.focus()} style={styles.inpBox}>
      <Text onPress={() => inpRef?.current?.focus()} style={styles.placeholder}>{placeholder}</Text>
      <View style={styles.row}>
        <TextInput
          ref={inpRef}
          value={value}
          style={styles.inp}
          secureTextEntry={!visible}
          cursorColor={Theme.accent}
          selectionColor={Theme.accent}
          onChangeText={(text) => onChange(text)}/>
        <TouchableOpacity
          style={styles.eyeBox}
          onPress={() => setVisible(prevState => !prevState)}>
          <Image
            style={styles.eye}
            source={visible ? require("../assets/images/ant-design_eye-filled.png") : require("../assets/images/ant-design_eye-invisible-filled.png")}/>
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  inpBox: {
    marginHorizontal: 32,
    borderBottomColor: Theme.border,
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 10
  },
  placeholder: {
    fontSize: 14,
    color: Theme.secondaryText,
    fontFamily: "Poppins500"
  },
  inp: {
    color: Theme.mainText,
    fontSize: 16,
    fontFamily: "Poppins500",
    marginBottom: 12,
    marginTop: 15,
    width: "100%"
  },
  eyeBox: {
    backgroundColor: "rgba(243, 243, 243, 1)",
    height: 24,
    width: 24,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  eye: {
    height: 18,
    width: 18
  }
});

export default PasswordInput;
