import {StyleSheet, Text, View} from "react-native";
import {Theme} from "../config/Theme";
import {useRef, useState} from "react";
import {PhoneIndexes} from "../config/PhoneIndexes";
import Select from "./Select";
import MaskInput from "react-native-mask-input/src/MaskInput";

const PhoneNumberInput = ({value, onChange}) => {
  const inpRef = useRef(null);
  const [index, setIndex] = useState(PhoneIndexes[0]);
  const [number, setNumber] = useState("");

  return (
    <View style={styles.container}>
      <Text onPress={() => inpRef?.current?.focus()} style={styles.placeholder}>Phone Number</Text>
      <View style={styles.row}>
        <Select
          placeholder={index}
          data={PhoneIndexes}
          onSelect={value => {
            setIndex(value)
            onChange(`${value}${number}`)
          }}/>
        <View style={styles.inpBox}>
          <MaskInput
            value={number}
            placeholder={""}
            style={styles.inp}
            keyboardType={"phone-pad"}
            cursorColor={Theme.accent}
            selectionColor={Theme.accent}
            onChangeText={(masked, unmasked) => {
              setNumber(masked)
              onChange(`${index}${unmasked}`)
            }}
            mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, "-", /\d/, /\d/, '-', /\d/, /\d/]}
            placeholderTextColor={"rgba(186, 186, 186, 1)"}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 32,
  },
  placeholder: {
    fontSize: 14,
    color: Theme.secondaryText,
    fontFamily: "Poppins500"
  },
  inp: {
    color: Theme.secondaryText,
    fontSize: 16,
    fontFamily: "Poppins500",
  },
  inpBox: {
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Theme.border,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 25,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default PhoneNumberInput;
