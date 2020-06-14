import React, { useContext, useState, FormEvent } from "react";
import {
  Segment,
  Form,
  Label,
  Dropdown,
  Button,
  Grid,
} from "semantic-ui-react";
import LoginStore from "../../app/stores/loginStore";

const LoginForm = () => {
  const initializeForm = () => {
    return {
      Username: "",
      Password: "",
    };
  };

  const loginStore = useContext(LoginStore);
  const { loginEmployee, authEmployee } = loginStore;

  const [employee, setEmployee] = useState(initializeForm);
  const [wrongUsername, setWrongUsername] = useState(false);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = () => {
    if (true) {
      loginEmployee(employee.Username, employee.Password);
      if(authEmployee?.Username === undefined || authEmployee?.Password === undefined){
        setWrongUsername(true)
      } else {
        setWrongUsername(false)
      }
    } else {
    }
  };
  return (
    <Grid className="masthead">
      <Grid.Row centered style={{ marginTop: 200 }}>
        <Grid.Column width={8}>
          <Form onSubmit={handleSubmit}>
            <label style={{color: "white"}}>Username *</label> 
            <Form.Input
              onChange={handleInputChange}
              placeholder="ZikaZ"
              name="Username"
            />
            <label style={{color: "white"}}>Password *</label> 
            <Form.Input
              onChange={handleInputChange}
              placeholder="******"
              name="Password"
              type="password"
            />
            {wrongUsername && (
            <Label
              basic
              pointing
              color="red"
              //style={{ marginBottom: 5 }}
              content="Wrong username or password. Please try again."
            />
          )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                style={{ width: "50%", marginRight: 10 }}
                positive
                type="submit"
                content="Login"
              />
            </div>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LoginForm;