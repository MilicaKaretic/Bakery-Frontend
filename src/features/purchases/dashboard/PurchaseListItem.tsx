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
import PurchaseStore from "../../../app/stores/purchaseStore";
import { IPurchaseDTO } from "../../../app/models/Purchase/purchaseDto";

const PurchaseListItem: React.FC<{ purchase: IPurchaseDTO }> = ({ purchase }) => {
  const purchaseStore = useContext(PurchaseStore);
  const { deletePurchase } = purchaseStore;
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
              <Item.Header style={{ marginTop: 20 }}>{purchase.PurchaseDate}</Item.Header>
              <Item.Meta style={{ marginBottom: 8 }}>
                {purchase.Material.MaterialName}
              </Item.Meta>
            </Item.Content>
            <Popup
              trigger={
                <Icon onClick={(e: any) => deletePurchase(e, purchase.PurchaseID)}>
                  <Image
                    style={{ marginRight: 160 }}
                    src={`/assets/x.png`}
                    wrapped
                    ui={false}
                  />
                </Icon>
              }
              content="Delete Purchase"
              position="top left"
            />
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/purchases/${purchase.PurchaseID}`}
          floated="right"
          content="View"
          color="grey"
        />
      </Segment>
    </Segment.Group>
  );
};

export default PurchaseListItem;
