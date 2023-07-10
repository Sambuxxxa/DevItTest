import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react-lite";
import {Theme} from "../../config/Theme";
import UserStore from "../../store/UserStore";
import AuthStore from "../../store/AuthStore";
import * as ImagePicker from "expo-image-picker";
import {useCallback, useMemo, useRef} from "react";
import {BottomSheetBackdrop, BottomSheetModal} from "@gorhom/bottom-sheet";
import MainButton from "../../components/MainButton";

const Header = ({avatar, setAvatar}) => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => [10, 250], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        opacity={0.5}
        {...props} />
    ),
    [],
  );

  const pickImage = async () => {
    bottomSheetModalRef.current?.close();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const pickCamera = async () => {
    bottomSheetModalRef.current?.close();
    await ImagePicker.getCameraPermissionsAsync().then(async ({granted}) => {
      if (!granted) {
        await ImagePicker.requestCameraPermissionsAsync()
      }
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text onPress={() => AuthStore.logOut()} style={styles.logOut}>Log Out</Text>
      </View>
      <View style={styles.avatarBox}>
        <View style={styles.circle}>
          <Text style={styles.avatarName}>{UserStore?.user?.name?.length > 0 && UserStore?.user?.name[0]}</Text>
        </View>
        {avatar && <Image style={styles.avatar} source={{uri: avatar}}/>}
        <TouchableOpacity
          style={styles.editBox}
          onPress={() => handlePresentModalPress()}>
          <Image source={require("../../assets/images/eva_edit-2-fill.png")} style={styles.edit}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{UserStore?.user?.name ?? ""}</Text>
      <Text style={styles.position}>{UserStore?.user?.position ?? ""}</Text>
      <BottomSheetModal
        index={1}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        backgroundStyle={styles.modal}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handleStyle}>
        <MainButton onPress={() => pickCamera()} title={"Open Camera"}/>
        <MainButton onPress={() => pickImage()} title={"Open Photos"}/>
      </BottomSheetModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : 50
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  title: {
    color: Theme.mainText,
    fontSize: 18,
    fontFamily: "Poppins500"
  },
  logOut: {
    color: Theme.accent,
    fontSize: 16,
    fontFamily: "Poppins500",
    position: 'absolute',
    right: 32
  },
  avatarBox: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.border,
  },
  avatarName: {
    color: Theme.secondaryText,
    fontSize: 25,
    fontFamily: "Poppins400"
  },
  avatar: {
    position: 'absolute',
    height: 70,
    width: 70,
    borderRadius: 35
  },
  editBox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(243, 243, 243, 1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  edit: {
    height: 18,
    width: 18
  },
  name: {
    color: Theme.mainText,
    fontSize: 24,
    fontFamily: "Poppins500",
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 3
  },
  position: {
    color: Theme.secondaryText,
    fontSize: 14,
    fontFamily: "Poppins500",
    alignSelf: 'center',
  },
  modal: {
    backgroundColor: Theme.bg
  },
})

export default observer(Header);
