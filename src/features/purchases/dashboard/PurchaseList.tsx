import React, { useContext, Fragment, useState } from "react";
import { Item, Button, Label, Segment, Search, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PurchaseStore from "../../../app/stores/purchaseStore";
import { Link } from "react-router-dom";
import PurchaseListItem from "./PurchaseListItem";
import _ from "lodash";
import { IPurchaseDTO } from "../../../app/models/Purchase/purchaseDto";
import ReactPaginate from "react-paginate";
import { strict } from "assert";

const PurchaseList: React.FC = () => {
  const purchaseStore = useContext(PurchaseStore);
  const {
    purchasesDTO: purchases,
    selectPurchase,
    deletePurchase,
    submitting,
    target,
  } = purchaseStore;

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(purchases.length / perPage));

  const [isLoading, setIsLoading] = useState(false);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [isSortDesc, setIsSortDesc] = useState(false);

  const [value, setValue] = useState("");
  const [results, setResults] = useState<IPurchaseDTO[]>(purchases.slice(offset, offset + perPage));


  // Sort

  const resetSort = () => {
    setIsSortAsc(false);
    setIsSortDesc(false);

    const slice = purchases.slice(offset, offset + perPage);

    setPageCount(Math.ceil(purchases.length / perPage));

    setResults(slice);
  };

  const sortAscHelper = () => {
    const slice = purchases
      .sort((a, b) => a.Material.MaterialName.localeCompare(b.Material.MaterialName))
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(purchases.length / perPage));

    setResults(slice);
  };
  const sortDescHelper = () => {
    const slice = purchases
      .sort((a, b) => a.Material.MaterialName.localeCompare(b.Material.MaterialName))
      .reverse()
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(purchases.length / perPage));

    setResults(slice);
  };

  const sortPurchasesAsc = () => {
    setIsSortAsc(true);
    setIsSortDesc(false);

    sortAscHelper();
  };

  const sortPurchasesDesc = () => {
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
      //setData();
      if (isSortAsc) {
        slice = purchases
          .sort((a, b) => a.Material.MaterialName.localeCompare(b.Material.MaterialName))
          .slice(offset, offset + perPage);
      } else if (isSortDesc) {
        slice = purchases
          .sort((a, b) => a.Material.MaterialName.localeCompare(b.Material.MaterialName))
          .reverse()
          .slice(offset, offset + perPage);
      } else {
        slice = purchases.slice(offset, offset + perPage);
      }
  
      setPageCount(Math.ceil(purchases.length / perPage));
  
      setResults(slice);
    };


  // Search
  const resultRenderer = ({ MaterialName }: any) => <Label content={MaterialName} />;

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
        setResults(purchases.slice(offset, offset + perPage));
      }
    } else {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result: any) => re.test(result.Material.MaterialName);

      setIsLoading(false);
      setResults(_.filter(purchases, isMatch));
    }
  };

  const handleResultSelect = (e: any, { result }: any) =>
    setValue(result.Material.MaterialName);

    return (
      <Fragment>
        <Dropdown text="Sort">
          <Dropdown.Menu>
            <Dropdown.Item
              text="Sort Ascending by Material Name"
              onClick={sortPurchasesAsc}
            />
            <Dropdown.Item
              text="Sort Descending by Material Name"
              onClick={sortPurchasesDesc}
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
            {results.map((purchase) => (
              <PurchaseListItem key={purchase.PurchaseID} purchase={purchase} />
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
export default observer(PurchaseList);
