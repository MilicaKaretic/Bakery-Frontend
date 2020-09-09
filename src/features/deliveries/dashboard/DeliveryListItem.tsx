import React, { useContext } from "react";
import {
  Item,
  Button,
  Label,
  Segment,
  Image,
  Popup,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import DeliveryStore from "../../../app/stores/deliveryStore";
import { IDeliveryDTO } from "../../../app/models/Delivery/deliveryDto";

const DeliveryListItem: React.FC<{ delivery: IDeliveryDTO }> = ({ delivery }) => {
  const deliveryStore = useContext(DeliveryStore);
  const { deleteDelivery } = deliveryStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 10 }}
              size="small"
              
              src="/assets/deliveryPlaceholder.png"
            />

            <Item.Content style={{ marginLeft: 20 }}>
              <Item.Header style={{ marginTop: 20 }}>{delivery.Product.ProductName}</Item.Header>
              <Item.Meta style={{ marginBottom: 8 }}>
                _________________________
              </Item.Meta>
              <Item.Meta style={{ marginBottom: 8 }}>
                Delivery Quantity: {delivery.DeliveryQuantity}
              </Item.Meta>
              <Item.Meta style={{ marginBottom: 8 }}>
                Deliverer: {delivery.Deliverer.DelivererName} {delivery.Deliverer.DelivererSurname}
              </Item.Meta>
              
              <Item.Meta style={{ marginBottom: 8 }}>
                Employee: {delivery.Employee.EmployeeName} {delivery.Employee.EmployeeSurname}
              </Item.Meta>
            </Item.Content>
            <Popup
              trigger={
                <Icon onClick={(e: any) => deleteDelivery(e, delivery.DeliveryID)}>
                  <Image
                    style={{ marginRight: 160 }}
                    src={`/assets/x.png`}
                    wrapped
                    ui={false}
                  />
                </Icon>
              }
              content="Delete Delivery"
              position="top left"
            />
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/deliveries/${delivery.DeliveryID}`}
          floated="right"
          content="View"
          color="green"
        />
        <Label basic content={delivery.Marketplace.MarketplaceName} />
        <Label basic content={delivery.Marketplace.Adress} />
      </Segment>
    </Segment.Group>
  );
};

export default DeliveryListItem;
