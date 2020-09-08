import React, { useContext, useState, FormEvent } from "react";
import {
  Form,
  Label,
  Button,
  Grid,
} from "semantic-ui-react";
import LoginStore from "../../app/stores/loginStore";

const LoginAdminForm = () => {
  const initializeForm = () => {
    return {
      Username: "",
      Password: "",
    };
  };

  const loginStore = useContext(LoginStore);
  const { loginAdmin, authAdmin } = loginStore;

  const [admin, setAdmin] = useState(initializeForm);
  const [wrongUsername, setWrongUsername] = useState(false);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = () => {
    if (true) {
      loginAdmin(admin.Username, admin.Password);
      if(authAdmin?.Username === undefined || authAdmin?.Password === undefined){       
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
            <label style={{color: "white"}}>Username </label> 
            <label style={{color: "red"}}> *</label>
            <Form.Input
              onChange={handleInputChange}
              placeholder="ZikaZ"
              name="Username"
            />
            <label style={{color: "white"}}>Password </label> 
            <label style={{color: "red"}}> *</label>
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

export default LoginAdminForm;