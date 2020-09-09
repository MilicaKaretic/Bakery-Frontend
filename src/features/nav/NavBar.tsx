import React, { useState, useContext } from "react";
import { Menu, Container, Dropdown, Modal, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import CreateDeliveryForm from "../deliveries/form/CreateDeliveryForm";
import CreatePurchaseForm from "../purchases/form/CreatePurchaseForm";
import CreateEmployeeForm from "../employees/form/CreateEmployeeForm";
import CreateProductForm from "../products/form/CreateProductForm";

import LoginStore from "../../app/stores/loginStore";

const NavBar: React.FC = () => {
  const loginStore = useContext(LoginStore);
  const {
    isEmployeeAuth,
    logOut,
    isAdminAuth,
    authAdmin,
    authEmployee
  } = loginStore;

  const [openDelivery, setOpenDelivery] = useState(false);
  const handleCloseDelivery = () => setOpenDelivery(false);

  const [openPurchase, setOpenPurchase] = useState(false);
  const handleClosePurchase = () => setOpenPurchase(false);

  const [openEmployee, setOpenEmployee] = useState(false);
  const handleCloseEmployee = () => setOpenEmployee(false);

  const [openProduct, setOpenProduct] = useState(false);
  const handleCloseProduct = () => setOpenProduct(false);

  return (
    <Menu fixed="top" stackable>
      <Container>
        <Menu.Item header as={NavLink} to="/" style={{color: "white"}}>
          <img src="/assets/placeholderBakery2.png" alt="logo"  style={{ marginRight: 10}} />
          Bakery
        </Menu.Item>

        <Dropdown item text="Deliveries" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item name="Deliveries" as={NavLink} to="/deliveries" style={{color: "white"}}>
            <img src="/assets/deliveryPlaceholder.png" alt="logo" style={{ marginRight: 10 }} />
              All Deliveries
            </Dropdown.Item>

            <Modal
              open={openDelivery}
              dimmer="blurring"
              trigger={
                <Dropdown.Item onClick={() => setOpenDelivery(true)}>
                  Create delivery
                </Dropdown.Item>
              }
              onClose={handleCloseDelivery}
            >
              <Modal.Content>
                <CreateDeliveryForm />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleCloseDelivery}>Close</Button>
              </Modal.Actions>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Purchases" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item name="Purchases" as={NavLink} to="/purchases">
            <img src="/assets/purchasePlaceholder.png" alt="logo" style={{ marginRight: 10 }} />
              All Purchases
            </Dropdown.Item>

            <Modal
              open={openPurchase}
              dimmer="blurring"
              trigger={
                <Dropdown.Item onClick={() => setOpenPurchase(true)}>
                  Create purchase
                </Dropdown.Item>
              }
              onClose={handleClosePurchase}
            >
              <Modal.Content>
                <CreatePurchaseForm />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleClosePurchase}>Close</Button>
              </Modal.Actions>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Products" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item name="Products" as={NavLink} to="/products">
            <img src="/assets/productPlaceholder.png" alt="logo" style={{ marginRight: 10 }} />
              All Products
            </Dropdown.Item>

            <Modal
              open={openProduct}
              dimmer="blurring"
              trigger={
                <Dropdown.Item onClick={() => setOpenProduct(true)}>
                  Create product
                </Dropdown.Item>
              }
              onClose={handleCloseProduct}
            >
              <Modal.Content>
                <CreateProductForm />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleCloseProduct}>Close</Button>
              </Modal.Actions>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>

        {!isEmployeeAuth && <Dropdown item text="Employees" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item name="Employees" as={NavLink} to="/employees">
            <img src="/assets/avatarPlaceholder.png" alt="logo" style={{ marginRight: 10 }} />
              All Employees
            </Dropdown.Item>

            <Modal
              open={openEmployee}
              dimmer="blurring"
              trigger={
                <Dropdown.Item onClick={() => setOpenEmployee(true)}>
                  Create employee
                </Dropdown.Item>
              }
              onClose={handleCloseEmployee}
            >
              <Modal.Content>
                <CreateEmployeeForm />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleCloseEmployee}>Close</Button>
              </Modal.Actions>
            </Modal>
          </Dropdown.Menu>
        </Dropdown>
}
      </Container>

      <Menu.Item floated="right">
        <Button onClick={logOut} text="Logout" icon="power">
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default observer(NavBar);
