import { makeAutoObservable } from "mobx";

class UserStore {
  login = "";
  roles = "";

  constructor() {
    makeAutoObservable(this); // Automatically converts properties to observables and actions
  }

  setLogin(login: string) {
    this.login = login;
  }

  setRoles(roles: string) {
    this.roles = roles;
  }

  getLogin() {
    return this.login;
  }

  getRoles() {
    return this.roles;
  }
}

const userStore = new UserStore();
export default userStore;
