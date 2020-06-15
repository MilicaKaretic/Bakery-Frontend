import React, { useContext } from "react";
import {
  Item,
  Button,
  Segment,
  Image,
  Popup,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import EmployeeStore from "../../../app/stores/employeeStore";
import { IEmployeeDTO } from "../../../app/models/Employee/employeeDto";

const EmployeeListItem: React.FC<{ employee: IEmployeeDTO }> = ({ employee }) => {
  const employeeStore = useContext(EmployeeStore);
  const { deleteEmployee } = employeeStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 10 }}
              size="small"            
              src="/assets/avatarPlaceholder.png"
            />

            <Item.Content style={{ marginLeft: 20 }}>
              <Item.Header style={{ marginTop: 20 }}>{employee.EmployeeName} {employee.EmployeeSurname}</Item.Header>
              <Item.Meta style={{ marginBottom: 8 }}>
                Name: {employee.EmployeeName}
              </Item.Meta>
              <Item.Meta style={{ marginBottom: 8 }}>
                Surname: {employee.EmployeeSurname}
              </Item.Meta>
              <Item.Meta style={{ marginBottom: 8 }}>
                Username: {employee.Username}
              </Item.Meta>
              {/* <Item.Meta style={{ marginBottom: 8 }}>
                Password: {employee.Password}
              </Item.Meta> */}
            </Item.Content>
            <Popup
              trigger={
                <Icon onClick={(e: any) => deleteEmployee(e, employee.EmployeeID)}>
                  <Image
                    style={{ marginRight: 160 }}
                    src={`/assets/x.png`}
                    wrapped
                    ui={false}
                  />
                </Icon>
              }
              content="Delete Employee"
              position="top left"
            />
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/employees/${employee.EmployeeID}`}
          floated="right"
          content="View"
          color="green"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EmployeeListItem;
