import React, { useState } from "react";
import { Segment, Item, Header, Button, Image, Modal } from "semantic-ui-react";
import EditDeliveryForm from "../form/EditDeliveryForm";
import { IDeliveryDTO } from "../../../app/models/Delivery/deliveryDto";
import { observer } from "mobx-react-lite";

const deliveryImageStyle = {
  filter: "brightness(30%)",
};

const deliveryImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const DeliveryDetailedHeader: React.FC<{ delivery: IDeliveryDTO }> = ({ delivery }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/placeholder_book.jpg`}
          fluid
          style={deliveryImageStyle}
        />
        <Segment basic style={deliveryImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={delivery.Product.ProductName}
                  style={{ color: "white" }}
                />
                <p>Quantity: {delivery.DeliveryQuantity} </p>
                <p>Employee: {delivery.Employee.EmployeeName} {delivery.Employee.EmployeeSurname}</p>
                <p>Deliverer: {delivery.Deliverer.DelivererName} {delivery.Deliverer.DelivererSurname}</p>
                <p>Marketplace: {delivery.Marketplace.MarketplaceName} </p>
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
          trigger={<Button onClick={() => setOpen(true)}>Edit</Button>}
          closeOnDimmerClick
          onClose={handleClose}
        >
          <Modal.Content>
            <EditDeliveryForm delivery={delivery!} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </Segment.Group>
  );
};

export default observer(DeliveryDetailedHeader);
