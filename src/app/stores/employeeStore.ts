import { IEmployee } from "./../models/Employee/employee";
import { observable, action } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IEmployeeDTO } from "../models/Employee/employeeDto";
import agent from "../api/agent";
import { IEmployeePost } from "../models/Employee/employeePost";

class EmployeeStore {
  @observable employeesRegistry = new Map();
  @observable employeesDTO: IEmployeeDTO[] = [];
  @observable loadingInitial = false;
  @observable employee: IEmployeeDTO | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

  @action loadEmployees = () => {
    this.loadingInitial = true;
    agent.Employees.list()
      .then((employeesResult) => {
         
          const employees = employeesResult.map(
            ({...employee }) => ({
              ...employee,              
            })
          );
          this.employeesDTO = employees;
        
      })
      .catch((err) => console.log(err))
      .finally(() => (this.loadingInitial = false));
  };

  @action loadEmployee = async (id: number) => {
    let employee = this.getEmployee(id);
    if (employee) {
      this.employee = employee;
    } else {
      this.loadingInitial = true;
      try {
        const employee: IEmployee = await agent.Employees.details(id);
        const newEmployee = {
          EmployeeID: employee?.EmployeeID,
          EmployeeName: employee?.EmployeeName,
          EmployeeSurname: employee?.EmployeeSurname,
          Username: employee?.Username,
          Password: employee?.Password,
        };

        this.employee = newEmployee;
        this.loadingInitial = false;
      } catch (err) {
        console.log(err);
        this.loadingInitial = false;
      }
    }
  };

  getEmployee = (id: number) => {
    return this.employeesDTO.find((d) => d.EmployeeID === id);
  };

  @action createEmployee = async (employee: IEmployeePost) => {
    this.submitting = true;
    try {
      await agent.Employees.create(employee);
      this.loadEmployees();
      this.createMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action openCreateForm = () => {
    this.createMode = true;
    this.employee = undefined;
  };

  @action openEditForm = (id: number) => {
    this.employee = this.employeesDTO.find((d) => d.EmployeeID === id);
    this.editMode = true;
  };

  @action cancelSelectedEmployee = () => {
    this.employee = undefined;
  };
  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };

  @action selectEmployee = (id: number) => {
    this.employee = this.employeesDTO.find((d) => d.EmployeeID === id);
    this.editMode = false;
    this.createMode = false;
  };

  @action editEmployee = async (employee: IEmployee) => {
    this.submitting = true;
    try {
      await agent.Employees.update(employee);
      this.loadEmployees();
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };

  @action deleteEmployee = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Employees.delete(id);
      this.loadEmployees();
      this.submitting = false;
      this.target = "";
    } catch (err) {
      this.submitting = false;
      this.target = "";
      console.log(err);
    }
  };
}

export default createContext(new EmployeeStore());
