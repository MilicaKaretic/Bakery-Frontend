import React, { useContext, Fragment, useState } from "react";
import { Item, Label, Search, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EmployeeStore from "../../../app/stores/employeeStore";
import EmployeeListItem from "./EmployeeListItem";
import _ from "lodash";
import { IEmployeeDTO } from "../../../app/models/Employee/employeeDto";
import ReactPaginate from "react-paginate";

const EmployeeList: React.FC = () => {
  const employeeStore = useContext(EmployeeStore);
  const {
    employeesDTO: employees,
    selectEmployee,
    deleteEmployee,
    submitting,
    target,
  } = employeeStore;

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(employees.length / perPage));

  const [isLoading, setIsLoading] = useState(false);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [isSortDesc, setIsSortDesc] = useState(false);

  const [value, setValue] = useState("");
  const [results, setResults] = useState<IEmployeeDTO[]>(employees.slice(offset, offset + perPage));


  // Sort

  const resetSort = () => {
    setIsSortAsc(false);
    setIsSortDesc(false);

    const slice = employees.slice(offset, offset + perPage);

    setPageCount(Math.ceil(employees.length / perPage));

    setResults(slice);
  };

  const sortAscHelper = () => {
    const slice = employees
      .sort((a, b) => a.EmployeeName.localeCompare(b.EmployeeName))
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(employees.length / perPage));

    setResults(slice);
  };
  const sortDescHelper = () => {
    const slice = employees
      .sort((a, b) => a.EmployeeName.localeCompare(b.EmployeeName))
      .reverse()
      .slice(offset, offset + perPage);
    setPageCount(Math.ceil(employees.length / perPage));

    setResults(slice);
  };

  const sortEmployeesAsc = () => {
    setIsSortAsc(true);
    setIsSortDesc(false);

    sortAscHelper();
  };

  const sortEmployeesDesc = () => {
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
        slice = employees
          .sort((a, b) => a.EmployeeName.localeCompare(b.EmployeeName))
          .slice(offset, offset + perPage);
      } else if (isSortDesc) {
        slice = employees
          .sort((a, b) => a.EmployeeName.localeCompare(b.EmployeeName))
          .reverse()
          .slice(offset, offset + perPage);
      } else {
        slice = employees.slice(offset, offset + perPage);
      }
  
      setPageCount(Math.ceil(employees.length / perPage));
  
      setResults(slice);
    };


  // Search
  const resultRenderer = ({ EmployeeName }: any) => <Label content={EmployeeName} />;

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
        setResults(employees.slice(offset, offset + perPage));
      }
    } else {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result: any) => re.test(result.EmployeeName);

      setIsLoading(false);
      setResults(_.filter(employees, isMatch));
    }
  };

  const handleResultSelect = (e: any, { result }: any) =>
    setValue(result.EmployeeName);

    return (
      <Fragment>
        <Dropdown text="Sort" style={{color: "white"}}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="Sort Ascending by Employee Name"
              onClick={sortEmployeesAsc}
            />
            <Dropdown.Item
              text="Sort Descending by Employee Name"
              onClick={sortEmployeesDesc}
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
            {results.map((employee) => (
              <EmployeeListItem key={employee.EmployeeID} employee={employee} />
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
export default observer(EmployeeList);
