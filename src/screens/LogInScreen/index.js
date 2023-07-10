import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text} from "react-native";
import {observer} from "mobx-react-lite";
import {Theme} from "../../config/Theme";
import AuthHeader from "../../components/AuthHeader";
import {useEffect, useState} from "react";
import MainInput from "../../components/MainInput";
import PasswordInput from "../../components/PasswordInput";
import MainButton from "../../components/MainButton";
import AuthStore from "../../store/AuthStore";

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AuthStore.getUsers()
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{flex: 1, justifyContent: "flex-end", backgroundColor: Theme.bg}}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader title={"Log In To Woorkroom"}/>
          <MainInput
            value={email}
            placeholder={"Your Email"}
            keyboardType={"email-address"}
            onChange={(text) => setEmail(text)}/>
          <PasswordInput
            value={password}
            placeholder={"Password"}
            onChange={(text) => setPassword(text)}/>
          <Text onPress={() => console.log("Forgot password?")} style={styles.forgot}>Forgot password?</Text>
          <MainButton title={"Log in"} onPress={() => AuthStore.logIn(email, password)}/>
          <Text style={styles.newUser}>New User?
            <Text onPress={() => navigation.push("SignUpScreen")} style={{color: Theme.accent}}> Create Account</Text>
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
  forgot: {
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'flex-end',
    marginHorizontal: 32,
    color: Theme.secondaryText,
    fontSize: 14,
    fontFamily: "Poppins400"
  },
  newUser: {
    color: Theme.secondaryText,
    fontSize: 14,
    fontFamily: "Poppins400",
    alignSelf: 'center',
    marginTop: 15
  }
});

export default observer(LogInScreen);
