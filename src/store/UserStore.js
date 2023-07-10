import {makeAutoObservable, runInAction} from "mobx";
import * as SQLite from "expo-sqlite";
import {userInfoSchema} from "../config/Schemas";
import AuthStore from "./AuthStore";

const db = SQLite.openDatabase('mydb.db');

class store {

  user = {};

  userID = null;

  constructor() {
    makeAutoObservable(this);
  };

  changeUserId(id) {
    runInAction(() => {
      this.userID = id;
    });
  };

  getUser(onGet) {
    if (this.userID) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE id = ?;',
          [this.userID],
          (_, {rows}) => {
            if (rows.length > 0) {
              runInAction(() => {
                this.user = rows.item(0)
              })
              onGet && onGet(rows.item(0))
            }
          }
        );
      });
    } else {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM current_user;',
          [],
          (_, {rows}) => {
            if (rows.length > 0) {
              runInAction(() => {
                this.userID = rows._array[0].userId;
              });
              tx.executeSql(
                'SELECT * FROM users WHERE id = ?;',
                [rows._array[0].userId],
                (_, {rows}) => {
                  if (rows.length > 0) {
                    runInAction(() => {
                      this.user = rows.item(0)
                    })
                    onGet && onGet(rows.item(0))
                  }
                }
              );
            }
          }
        );
      });
    }
  }

  async updateInfo(phoneNumber, name, email, position, skype, avatar) {
    const formData = {
      phoneNumber,
      name,
      email,
    }
    try {
      await userInfoSchema.validate(formData, {abortEarly: false});
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET phoneNumber = ?, name = ?, email = ?, password = ?, position = ?, skype = ?, avatar = ? WHERE id = ?;',
          [
            phoneNumber,
            name,
            email,
            this.user?.password,
            position,
            skype,
            avatar,
            this.userID
          ],
          (_, {rowsAffected}) => {
            if (rowsAffected > 0) {
              console.log('Data updated successfully');
              this.getUser()
            } else {
              console.log('Failed to update data');
            }
          }
        );
      });
    } catch (validationErrors) {
      validationErrors.inner.forEach(error => {
        AuthStore.showToast(error.message)
      });
    }
  }
}


const UserStore = new store();

export default UserStore;

