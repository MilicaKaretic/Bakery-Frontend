import React, { useState } from "react";
import { Segment, Item, Header, Button, Image, Modal } from "semantic-ui-react";
import EditPurchaseForm from "../form/EditPurchaseForm";
import { IPurchaseDTO } from "../../../app/models/Purchase/purchaseDto";
import { observer } from "mobx-react-lite";

const purchaseImageStyle = {
  filter: "brightness(30%)",
};

const purchaseImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const PurchaseDetailedHeader: React.FC<{ purchase: IPurchaseDTO }> = ({ purchase }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/purchGray.jpg`}
          fluid
          style={purchaseImageStyle}
        />
        <Segment basic style={purchaseImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={purchase.Quantity}
                  style={{ color: "white" }}
                />
                <p>Date: {purchase.PurchaseDate} </p>
                <p>Material: {purchase.Material.MaterialName} </p>
                <p>Employee: {purchase.Employee.EmployeeName} {purchase.Employee.EmployeeSurname} </p>
                <p>Supplier: {purchase.Supplier.SupplierName}</p>
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
            <EditPurchaseForm purchase={purchase!} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </Segment.Group>
  );
};

export default observer(PurchaseDetailedHeader);
