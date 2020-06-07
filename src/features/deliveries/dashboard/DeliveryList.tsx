import React, { useContext, Fragment, useState } from "react";
import { Item, Button, Label, Segment, Search } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import DeliveryStore from "../../../app/stores/deliveryStore";
import { Link } from "react-router-dom";
import DeliveryListItem from "./DeliveryListItem";
import _ from "lodash";
import { IDeliveryDTO } from "../../../app/models/Delivery/deliveryDto";

const DeliveryList: React.FC = () => {
  const deliveryStore = useContext(DeliveryStore);
  const {
    deliveriesDTO: deliveries,
    selectDelivery,
    deleteDelivery,
    submitting,
    target,
  } = deliveryStore;
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<IDeliveryDTO[]>(deliveries);

  const handleSearchChange = (e: any, { value }: any) => {
    setIsLoading(true);
    setValue(value);

    setTimeout(() => {
      if (value.length < 1) {
        setIsLoading(false);
        setValue("");
        setResults([]);
      }

      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result: any) => re.test(result.Title);

      setIsLoading(false);
      setResults(_.filter(deliveries, isMatch));
    }, 300);
  };
  return (
    <Fragment>
      <Search
        loading={isLoading}
        //onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        //resultRenderer={resultRenderer}
        // {...this.props}
      />
      <Item.Group divided>
        {results.map((delivery) => (
          <DeliveryListItem key={delivery.DeliveryID} delivery={delivery} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(DeliveryList);
