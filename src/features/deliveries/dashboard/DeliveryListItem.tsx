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
              size="tiny"
              circular
              src="/assets/book_placeholder.png"
            />

            <Item.Content style={{ marginLeft: 20 }}>
              <Item.Header style={{ marginTop: 20 }}>{delivery.DeliveryQuantity}</Item.Header>
              <Item.Meta style={{ marginBottom: 8 }}>
                {delivery.Product.ProductName}
              </Item.Meta>
              {/* <Item.Extra>
                <Label basic content={book.Genre.GenreName} />
              </Item.Extra> */}
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
          color="grey"
        />
        {/*    <Button
          name={book.BookID}
          loading={+target === book.BookID && submitting}
          onClick={(e) => deleteBook(e, book.BookID)}
          floated="right"
          content="Delete"
          color="red"
        /> */}
        <Label basic content={delivery.Marketplace.MarketplaceName} />
      </Segment>
    </Segment.Group>
  );
};

export default DeliveryListItem;
