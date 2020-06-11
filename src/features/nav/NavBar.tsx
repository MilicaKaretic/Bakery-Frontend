import React, { useState } from "react";
import { Menu, Container, Dropdown, Modal, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import CreateDeliveryForm from "../deliveries/form/CreateDeliveryForm";
import CreatePurchaseForm from "../purchases/form/CreatePurchaseForm";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Menu fixed="top" stackable>
      <Container>
        <Menu.Item header as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Bakery
        </Menu.Item>

        {/* <Menu.Item name="Books" as={NavLink} to='/books'/> */}

        <Dropdown item text="Deliveries">
          <Dropdown.Menu>
            <Dropdown.Item name="Deliveries" as={NavLink} to="/deliveries">
              All Deliveries
            </Dropdown.Item>

            {/* <Dropdown.Item   as={NavLink} to='/createBook'>Create New Book</Dropdown.Item> */}
            <Modal
              open={open}
              dimmer="blurring"
              trigger={
                <Dropdown.Item onClick={() => setOpen(true)}>
                  Create delivery
                </Dropdown.Item>
              }
              onClose={handleClose}
            >
              <Modal.Content>
                <CreateDeliveryForm />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleClose}>Close</Button>
              </Modal.Actions>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Purchases">
          <Dropdown.Menu>
            <Dropdown.Item name="Purchases" as={NavLink} to="/purchases">
              All Purchases
            </Dropdown.Item>

            {/* <Dropdown.Item   as={NavLink} to='/createBook'>Create New Book</Dropdown.Item> */}
            <Modal
              open={open}
              dimmer="blurring"
              trigger={
                <Dropdown.Item onClick={() => setOpen(true)}>
                  Create purchase
                </Dropdown.Item>
              }
              onClose={handleClose}
            >
              <Modal.Content>
                <CreatePurchaseForm />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleClose}>Close</Button>
              </Modal.Actions>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
