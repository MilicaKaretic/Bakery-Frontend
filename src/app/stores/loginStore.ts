import { action, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IEmployee } from "../models/Employee/employee";
import { IAdmin } from "../models/Admin/admin";

import { history } from "../../index";

class LoginStore {
  @observable authEmployee: IEmployee | undefined;
  @observable isEmployeeAuth: boolean = false;
  
  @observable authAdmin: IEmployee | undefined;
  @observable isAdminAuth: boolean = false;

  @action loginEmployee = (username: string, password: string) => {
    agent.Login.login(username, password)
      .then((employee) => {
        if(employee.data.length === 0)
        {
          this.isEmployeeAuth = false;                  
        }
        else{
          this.isEmployeeAuth = true;
          console.log(this.isEmployeeAuth  + " emp");
          console.log(this.isAdminAuth  + " admin");
          this.authEmployee = employee.data["0"];
          history.push("/deliveries")
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/deliveries");
      });
  };

  @action loginAdmin = (username: string, password: string) => {
    agent.LoginAdmin.loginAdmin(username, password)
      .then((user) => {
        if (user.data.length === 0) {
          console.log("no");
          this.isAdminAuth = false;
        } else {
          this.isAdminAuth = true;
          this.authAdmin = user.data["0"];
          history.push("/employees");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  };

  @action logOut = () => {
    this.isEmployeeAuth = false;
    this.isAdminAuth = false;
    history.push("/");
  
};
}

export default createContext(new LoginStore());