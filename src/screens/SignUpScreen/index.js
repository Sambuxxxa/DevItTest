import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text} from "react-native";
import {Theme} from "../../config/Theme";
import {observer} from "mobx-react-lite";
import AuthHeader from "../../components/AuthHeader";
import MainButton from "../../components/MainButton";
import {useState} from "react";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import MainInput from "../../components/MainInput";
import PasswordInput from "../../components/PasswordInput";
import CodeInput from "../../components/CodeInput";
import AuthStore from "../../store/AuthStore";

const SignUpScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{flex: 1, justifyContent: "flex-end", backgroundColor: Theme.bg}}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader title={"Sign Up To woorkroom"}/>
          <PhoneNumberInput
            value={phoneNumber}
            onChange={(text) => setPhoneNumber(text)}/>
          <CodeInput
            value={code}
            codeLength={4}
            textStyle={styles.code}
            keyboardType={"phone-pad"}
            cellStyle={styles.codeInp}
            onTextChange={(text) => setCode(text)}
            cellStyleFocused={{borderColor: Theme.accent}}/>
          <MainInput
            value={name}
            placeholder={"Your Name"}
            onChange={text => setName(text)}/>
          <MainInput
            value={email}
            placeholder={"Your Email"}
            keyboardType={"email-address"}
            onChange={text => setEmail(text)}/>
          <PasswordInput
            value={password}
            placeholder={"Password"}
            onChange={text => setPassword(text)}/>
          <PasswordInput
            value={confirmPassword}
            placeholder={"Confirm Password"}
            onChange={text => setConfirmPassword(text)}/>
          <MainButton
            title={"Next"}
            onPress={() => AuthStore.createAccount(phoneNumber, name, email, password, confirmPassword, code)}/>
          <Text style={styles.newUser}>Have Account?
            <Text onPress={() => navigation.push("LogInScreen")} style={{color: Theme.accent}}> Log In</Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bg
  },
  logo: {
    height: 100,
    width: 100
  },
  newUser: {
    color: Theme.secondaryText,
    fontSize: 14,
    fontFamily: "Poppins400",
    alignSelf: 'center',
    marginTop: 15
  },
  codeInp: {
    borderWidth: 1,
    height: 48,
    width: 48,
    borderRadius: 15,
    backgroundColor: Theme.bg,
    borderColor: Theme.border,
  },
  code: {
    color: Theme.mainText,
    fontSize: 16,
    fontFamily: "Poppins500"
  }
});

export default observer(SignUpScreen);
