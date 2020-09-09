import React, { useContext, Fragment, useState } from "react";
import { Item, Label, Search, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProductStore from "../../../app/stores/productStore";
import ProductListItem from "./ProductListItem";
import _ from "lodash";
import { IProductDTO } from "../../../app/models/Product/productDto";
import ReactPaginate from "react-paginate";

const ProductList: React.FC = () => {
  const productStore = useContext(ProductStore);
  const {
    productsDTO: products,
    selectProduct,
    deleteProduct,
    submitting,
    target,
  } = productStore;

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(products.length / perPage));

  const [isLoading, setIsLoading] = useState(false);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [isSortDesc, setIsSortDesc] = useState(false);

  const [value, setValue] = useState("");
  const [results, setResults] = useState<IProductDTO[]>(products.slice(offset, offset + perPage));


  // Sort

  const resetSort = () => {
    setIsSortAsc(false);
    setIsSortDesc(false);

    const slice = products.slice(offset, offset + perPage);

    setPageCount(Math.ceil(products.length / perPage));

    setResults(slice);
  };

  const sortAscHelper = () => {
    const slice = products
      .sort((a, b) => a.ProductName.localeCompare(b.ProductName))
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(products.length / perPage));

    setResults(slice);
  };
  const sortDescHelper = () => {
    const slice = products
      .sort((a, b) => a.ProductName.localeCompare(b.ProductName))
      .reverse()
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(products.length / perPage));

    setResults(slice);
  };

  const sortProductsAsc = () => {
    setIsSortAsc(true);
    setIsSortDesc(false);

    sortAscHelper();
  };

  const sortProductsDesc = () => {
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
        slice = products
          .sort((a, b) => a.ProductName.localeCompare(b.ProductName))
          .slice(offset, offset + perPage);
      } else if (isSortDesc) {
        slice = products
          .sort((a, b) => a.ProductName.localeCompare(b.ProductName))
          .reverse()
          .slice(offset, offset + perPage);
      } else {
        slice = products.slice(offset, offset + perPage);
      }
  
      setPageCount(Math.ceil(products.length / perPage));
  
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
        setResults(products.slice(offset, offset + perPage));
      }
    } else {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result: any) => re.test(result.ProductName);

      setIsLoading(false);
      setResults(_.filter(products, isMatch));
    }
  };

  const handleResultSelect = (e: any, { result }: any) =>
    setValue(result.ProductName);

    return (
      <Fragment>
        <Dropdown text="Sort" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="Sort Ascending by Product Name"
              onClick={sortProductsAsc}
            />
            <Dropdown.Item
              text="Sort Descending by Product Name"
              onClick={sortProductsDesc}
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
            {results.map((product) => (
              <ProductListItem key={product.ProductID} product={product} />
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
export default observer(ProductList);
