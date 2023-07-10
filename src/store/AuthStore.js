import {makeAutoObservable, runInAction} from "mobx";
import * as SQLite from "expo-sqlite";
import getValue from "../utils/storage/getValue";
import storeValue from "../utils/storage/storeValue";
import UserStore from "./UserStore";
import Toast from "react-native-toast-message";
import {logInSchema, newUserSchema} from "../config/Schemas";

const db = SQLite.openDatabase('mydb.db');

class store {

  showAuth = true;

  users = [];

  constructor() {
    makeAutoObservable(this);
  };

  showToast(title) {
    Toast.show({
      type: 'error',
      text1: 'ERROR',
      text2: title
    });
  }

  async checkShowAuth() {
    const showAuth = await getValue("ShowAuth", true)
    runInAction(() => {
      this.showAuth = showAuth;
    });
    if (!showAuth) {
      UserStore.getUser()
    }
    this.getUsers();
  };

  changeShowAuth(value) {
    runInAction(() => {
      this.showAuth = value;
    });
    storeValue("ShowAuth", value)
  }

  getUsers() {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, {rows}) => {
          if (rows?._array.length > 0) {
            runInAction(() => {
              this.users = rows?._array;
            });
          }
        }
      );
    });
  };

  async createAccount(phoneNumber, name, email, password, confirmPassword, code) {
    const formData = {
      phoneNumber,
      name,
      email,
      password,
      confirmPassword,
      code
    }
    try {
      await newUserSchema.validate(formData, {abortEarly: false});
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, phoneNumber TEXT, name TEXT, email TEXT, password TEXT, position TEXT, skype TEXT, avatar TEXT);'
        );
        tx.executeSql(
          'INSERT INTO users (phoneNumber, name, email, password, position, skype, avatar) VALUES (?, ?, ?, ?, ?, ?, ?);',
          [
            phoneNumber,
            name,
            email,
            password,
            "Position",
            "",
            ""
          ],
          (_, {insertId}) => {
            console.log('Data saved successfully. User ID: ', insertId);
            UserStore.changeUserId(insertId)
            this.saveUserId(insertId)
            this.changeShowAuth(false)
          }
        );
      });
    } catch (validationErrors) {
      validationErrors.inner.forEach(error => {
        this.showToast(error.message)
      });
    }
  };

  saveUserId(id) {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS current_user (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER);'
      );
      tx.executeSql(
        'DELETE FROM current_user;', // Очищаем таблицу перед сохранением нового значения
        [],
        (_, {rowsAffected}) => {
          if (rowsAffected > 0) {
            console.log('Previous user deleted successfully');
          }
        }
      );
      tx.executeSql(
        'INSERT INTO current_user (userId) VALUES (?);',
        [id],
        (_, {insertId}) => {
          console.log('Current user saved successfully. ID:', insertId);
        }
      );
    });
  }

  logOut() {
    this.changeShowAuth(true)
  }

  async logIn(email, password) {
    const formData = {email, password}
    try {
      await logInSchema.validate(formData, {abortEarly: false});
      let error = true
      this.users.some(user => {
        if (user?.email === email && user?.password === password) {
          error = false
          this.saveUserId(user.id)
          UserStore.changeUserId(user.id)
          this.changeShowAuth(false)
        }
      })
      error && this.showToast("Пользователь не найден")
    } catch (validationErrors) {
      validationErrors.inner.forEach(error => {
        this.showToast(error.message)
      });
    }
  }

}


const AuthStore = new store();

export default AuthStore;

