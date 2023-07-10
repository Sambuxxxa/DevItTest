import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {Theme} from "../../config/Theme";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import MainInput from "../../components/MainInput";
import MainButton from "../../components/MainButton";
import Header from "./Header";
import UserStore from "../../store/UserStore";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import PhoneInput from "./PhoneInput";

const EditProfileScreen = ({navigation}) => {
  const [avatar, setAvatar] = useState(UserStore?.user?.avatar ?? "");
  const [name, setName] = useState(UserStore?.user?.name ?? "");
  const [email, setEmail] = useState(UserStore?.user?.email ?? "");
  const [phone, setPhone] = useState(UserStore?.user?.phoneNumber ?? "");
  const [position, setPosition] = useState(UserStore?.user?.position ?? "");
  const [skype, setSkype] = useState(UserStore?.user?.skype ?? "");

  useEffect(() => {
    UserStore.getUser((data) => {
      setName(data?.name ?? "")
      setSkype(data?.skype ?? "")
      setEmail(data?.email ?? "")
      setAvatar(data?.avatar ?? "")
      setPhone(data?.phoneNumber ?? "")
      setPosition(data?.position ?? "")
    })
  }, []);

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{flex: 1, justifyContent: "flex-end", backgroundColor: Theme.bg}}>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header avatar={avatar} setAvatar={setAvatar}/>
            <MainInput
              value={name}
              placeholder={"Name"}
              onChange={text => setName(text)}/>
            <MainInput
              value={email}
              placeholder={"Email"}
              keyboardType={"email-address"}
              onChange={text => setEmail(text)}/>
            <PhoneInput
              value={phone}
              placeholder={"Phone"}
              onChange={text => setPhone(text)}/>
            <MainInput
              value={position}
              placeholder={"Position"}
              onChange={text => setPosition(text)}/>
            <MainInput
              value={skype}
              placeholder={"Skype"}
              onChange={text => setSkype(text)}/>
            <MainButton
              title={"Save"}
              onPress={() => UserStore.updateInfo(phone, name, email, position, skype, avatar)}/>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bg
  }
});

export default observer(EditProfileScreen);

