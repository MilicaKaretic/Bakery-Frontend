import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Dropdown, Label } from "semantic-ui-react";
import { IEmployeeDTO } from "../../../app/models/Employee/employeeDto";
import EmployeeStore from "../../../app/stores/employeeStore";
import { observer } from "mobx-react-lite";
interface IProps {
  employee: IEmployeeDTO;
}

const EditEmployeeForm: React.FC<IProps> = ({ employee: initialFormState }) => {
  const employeeStore = useContext(EmployeeStore);
  const {
    editEmployee,
    submitting,
    employeesDTO,
  } = employeeStore;

  const [employee, setEmployee] = useState<IEmployeeDTO>(initialFormState);
  const [errorEmployeeName, setErrorEmployeeName] = useState(false);
  const [errorEmployeeSurname, setErrorEmployeeSurname] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);
  const [usernameRequiredError, setUsernameRequiredError] = useState(false);
  const [employeeSurnameRequiredError, setEmployeeSurnameRequiredError] = useState(false);
  const [employeeNameRequiredError, setEmployeeNameRequiredError] = useState(false);
  const handleSubmit = () => {
    const employeeNameValid = employee.EmployeeName !== "";
    if (!employeeNameValid) {
        setEmployeeNameRequiredError(true);
    }
    const employeeSurnameValid = employee.EmployeeSurname !== "";
    if (!employeeSurnameValid) {
        setEmployeeSurnameRequiredError(true);
    }
    const usernameValid = employee.Username !== "";
    if (!usernameValid) {
      setUsernameRequiredError(true);
    }
    const passwordValid = employee.Password !== "";
    if (!passwordValid) {
      setPasswordRequiredError(true);
    }


    const formValid = employeeNameValid && employeeSurnameValid && usernameValid && passwordValid;

    if (formValid) {
      editEmployee({
        EmployeeID: +employee.EmployeeID,
        EmployeeName: employee.EmployeeName,
        EmployeeSurname: employee.EmployeeSurname,
        Username: employee.Username,
        Password: employee.Password,
      });
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "EmployeeName") {
      if (value === "") {
        setEmployeeNameRequiredError(true);
      } else {
        setEmployeeNameRequiredError(false);
      }
    }

    if (name === "EmployeeSurname") {
        if (value === "") {
          setEmployeeSurnameRequiredError(true);
        } else {
          setEmployeeSurnameRequiredError(false);
        }
      }

      if (name === "Username") {
        if (value === "") {
          setUsernameRequiredError(true);
        } else {
          setUsernameRequiredError(false);
        }
      }
      if (name === "Password") {
        if (value === "") {
          setPasswordRequiredError(true);
        } else {
          setPasswordRequiredError(false);
        }
      }

    setEmployee({ ...employee, [name]: value });
  };

  
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Employee Name "
            required true
            placeholder="20"
            name="EmployeeName"
            error={errorEmployeeName}
            value={employee?.EmployeeName}
          />
          {errorEmployeeName && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Employee Name is too big"
            />
          )}
          {employeeNameRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Employee Name"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Employee Surname "
            required true
            placeholder="20"
            name="EmployeeSurname"
            error={errorEmployeeSurname}
            value={employee?.EmployeeSurname}
          />
         {errorEmployeeSurname && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Employee Surname is too big"
            />
          )}
          {employeeSurnameRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Employee Surname"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Username"
            required true
            placeholder="20"
            name="Username"
            value={employee.Username}
            error={errorUsername}
          />
          {errorUsername && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Username is too big"
            />
          )}
          {usernameRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Username"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        <Form.Field>
          <Form.Input
            onChange={handleInputChange}
            label="Password "
            required true
            placeholder="20"
            name="Password"
            value={employee.Password}
            error={errorPassword}
          />
          {errorPassword && (
            <Label
              basic
              pointing
              color="red"
              content="Password is too big"
            />
          )}
          {passwordRequiredError && (
            <Label
              basic
              color="red"
              pointing
              content="Please add Password"
              style={{ marginBottom: 10 }}
            />
          )}
        </Form.Field>
        
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            loading={submitting}
            style={{ width: "50%", marginRight: 10 }}
            positive
            type="submit"
            content="Save"
            
          />
          {}
        </div>
      </Form>
    </Segment>
  );
};

export default observer(EditEmployeeForm);
