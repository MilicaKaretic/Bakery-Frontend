import React, { useContext, Fragment, useState } from "react";
import { Item, Button, Label, Segment, Search, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import DeliveryStore from "../../../app/stores/deliveryStore";
import DeliveryListItem from "./DeliveryListItem";
import _ from "lodash";
import { IDeliveryDTO } from "../../../app/models/Delivery/deliveryDto";
import ReactPaginate from "react-paginate";

const DeliveryList: React.FC = () => {
  const deliveryStore = useContext(DeliveryStore);
  const {
    deliveriesDTO: deliveries,
    selectDelivery,
    deleteDelivery,
    submitting,
    target,
  } = deliveryStore;

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(deliveries.length / perPage));

  const [isLoading, setIsLoading] = useState(false);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [isSortDesc, setIsSortDesc] = useState(false);

  const [value, setValue] = useState("");
  const [results, setResults] = useState<IDeliveryDTO[]>(deliveries.slice(offset, offset + perPage));


  // Sort

  const resetSort = () => {
    setIsSortAsc(false);
    setIsSortDesc(false);

    const slice = deliveries.slice(offset, offset + perPage);

    setPageCount(Math.ceil(deliveries.length / perPage));

    setResults(slice);
  };

  const sortAscHelper = () => {
    const slice = deliveries
      .sort((a, b) => a.Product.ProductName.localeCompare(b.Product.ProductName))
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(deliveries.length / perPage));

    setResults(slice);
  };
  const sortDescHelper = () => {
    const slice = deliveries
      .sort((a, b) => a.Product.ProductName.localeCompare(b.Product.ProductName))
      .reverse()
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(deliveries.length / perPage));

    setResults(slice);
  };

  const sortDeliveriesAsc = () => {
    setIsSortAsc(true);
    setIsSortDesc(false);

    sortAscHelper();
  };

  const sortDeliveriesDesc = () => {
    setIsSortDesc(true);
    setIsSortAsc(false);

    sortDescHelper();
  };
  
    //Pagination
    const handlePageClick = (e: any) => {
      const selectedPage = e.selected;
  
      const offset = selectedPage * perPage;
  
      setCurrentPage(selectedPage);
      setOffset(offset);
  
      let slice;
      if (isSortAsc) {
        slice = deliveries
          .sort((a, b) => a.Product.ProductName.localeCompare(b.Product.ProductName))
          .slice(offset, offset + perPage);
      } else if (isSortDesc) {
        slice = deliveries
          .sort((a, b) => a.Product.ProductName.localeCompare(b.Product.ProductName))
          .reverse()
          .slice(offset, offset + perPage);
      } else {
        slice = deliveries.slice(offset, offset + perPage);
      }
  
      setPageCount(Math.ceil(deliveries.length / perPage));
  
      setResults(slice);
    };


  // Search
  const resultRenderer = ({ ProductName }: any) => <Label content={ProductName} />;

  const handleSearchChange = (e: any, { value }: any) => {
    setIsLoading(true);
    setValue(value);

    const noValue = value.length < 1;

    if (noValue) {
      setIsLoading(false);
      setValue("");
      if (isSortAsc) {
        sortAscHelper();
      } else if (isSortDesc) {
        sortDescHelper();
      } else {
        setResults(deliveries.slice(offset, offset + perPage));
      }
    } else {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result: any) => re.test(result.Product.ProductName);

      setIsLoading(false);
      setResults(_.filter(deliveries, isMatch));
    }
  };

  const handleResultSelect = (e: any, { result }: any) =>
    setValue(result.Product.ProductName);

    return (
      <Fragment>
        <Dropdown text="Sort" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="Sort Ascending by Product Name"
              onClick={sortDeliveriesAsc}
            />
            <Dropdown.Item
              text="Sort Descending by Product Name"
              onClick={sortDeliveriesDesc}
            />
            <Dropdown.Item text="Default" onClick={resetSort} />
          </Dropdown.Menu>
        </Dropdown>
        <div
          style={{
            justifyContent: "center",
          }}
        >
          <Search
            fluid
            input={{ fluid: true }}
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
          />
          <Item.Group divided>
            {results.map((delivery) => (
              <DeliveryListItem key={delivery.DeliveryID} delivery={delivery} />
            ))}
          </Item.Group>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            //subContainerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </Fragment>
    );
  };
export default observer(DeliveryList);
