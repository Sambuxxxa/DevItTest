import {Pressable, StyleSheet, Text, TextInput} from "react-native";
import {Theme} from "../config/Theme";
import {useRef} from "react";

const MainInput = ({value, onChange, placeholder = "", keyboardType = "default"}) => {
  const inpRef = useRef(null);

  return (
    <Pressable onPress={() => inpRef?.current?.focus()} style={styles.inpBox}>
      <Text onPress={() => inpRef?.current?.focus()} style={styles.placeholder}>{placeholder}</Text>
      <TextInput
        ref={inpRef}
        value={value}
        style={styles.inp}
        cursorColor={Theme.accent}
        keyboardType={keyboardType}
        selectionColor={Theme.accent}
        onChangeText={(text) => onChange(text)}/>
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
    marginTop: 15
  }
});

export default MainInput;
