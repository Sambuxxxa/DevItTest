import {Pressable, StyleSheet, Text} from "react-native";
import {Theme} from "../../config/Theme";
import {useRef} from "react";
import MaskInput from "react-native-mask-input/src/MaskInput";

const PhoneInput = ({value, onChange, placeholder = ""}) => {
  const inpRef = useRef(null);

  return (
    <Pressable onPress={() => inpRef?.current?.focus()} style={styles.inpBox}>
      <Text onPress={() => inpRef?.current?.focus()} style={styles.placeholder}>{placeholder}</Text>
      <MaskInput
        ref={inpRef}
        value={value}
        placeholder={""}
        style={styles.inp}
        keyboardType={"phone-pad"}
        cursorColor={Theme.accent}
        selectionColor={Theme.accent}
        onChangeText={(masked, unmasked) => {
          onChange(`+${unmasked}`)
        }}
        mask={["+", /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}/>
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

export default PhoneInput;
