import React, { useState } from "react";
import { Segment, Item, Header, Button, Image, Modal } from "semantic-ui-react";
import EditEmployeeForm from "../form/EditEmployeeForm";
import { IEmployeeDTO } from "../../../app/models/Employee/employeeDto";
import { observer } from "mobx-react-lite";

const employeeImageStyle = {
  filter: "brightness(30%)",
};

const employeeImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const EmployeeDetailedHeader: React.FC<{ employee: IEmployeeDTO }> = ({ employee }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/avatarEdit.jpg`}
          size="massive"
          style={employeeImageStyle}
        />
        <Segment basic style={employeeImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={employee.Username}
                  style={{ color: "white" }}
                />
                <p>Name: {employee.EmployeeName} </p>
                <p>Surname: {employee.EmployeeSurname} </p>
                <p>Username: {employee.Username} </p>
                {/* <p>Password: {employee.Password} </p> */}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Modal
          open={open}
          closeOnTriggerClick
          dimmer="blurring"
          trigger={<Button color="green" onClick={() => setOpen(true)}>Edit</Button>}
          closeOnDimmerClick
          onClose={handleClose}
        >
          <Modal.Content>
            <EditEmployeeForm employee={employee!} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </Segment.Group>
  );
};

export default observer(EmployeeDetailedHeader);
