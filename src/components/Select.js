import {Dimensions, StyleSheet, View} from "react-native";
import {observer} from "mobx-react-lite";
import SelectDropdown from "react-native-select-dropdown";
import {Theme} from "../config/Theme";
import {Ionicons} from '@expo/vector-icons';

const {width} = Dimensions.get("screen");
const SmallButton = ({data, onSelect, placeholder}) => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        rowTextStyle={styles.title}
        buttonStyle={styles.select}
        buttonTextStyle={styles.title}
        dropdownStyle={styles.dropdown}
        defaultButtonText={placeholder}
        renderDropdownIcon={() => <Ionicons name="chevron-down-outline" size={18} color={Theme.secondaryText}/>}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
    height: 48,
    backgroundColor: Theme.bg,
  },
  select: {
    width: 70,
    height: 48,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: 15,
    backgroundColor: Theme.bg
  },
  title: {
    fontSize: 16,
    color: Theme.secondaryText,
    marginHorizontal: 5,
    fontFamily: "Poppins500"
  },
  dropdown: {
    borderRadius: 10,
    backgroundColor: Theme.bg
  }
});

export default observer(SmallButton);
