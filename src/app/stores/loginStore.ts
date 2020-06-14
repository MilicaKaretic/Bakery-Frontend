import { action, observable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IEmployee } from "../models/Employee/employee";
import { IEmployeeDTO } from "../models/Employee/employeeDto";
import { IEmployeePost } from "../models/Employee/employeePost";
import { history } from "../../index";

class LoginStore {
  @observable authEmployee: IEmployee | undefined;
  @observable isEmployeeAuth: boolean = false;

  @action loginEmployee = (username: string, password: string) => {
    agent.Login.login(username, password)
      .then((employee) => {
        if(employee.data.length === 0)
        {
          this.isEmployeeAuth = false;
        }
        else{
          this.isEmployeeAuth = true;
          this.authEmployee = employee.data["0"];
          history.push("/deliveries")
        }
        /* this.authEmployee = employee.data;
        this.isEmployeeAuth = true;
        if (history.location.pathname === "/login") {
          history.push("/");
        } */
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  };
}

export default createContext(new LoginStore());