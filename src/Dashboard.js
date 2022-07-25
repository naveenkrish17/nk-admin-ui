import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Row from "./Row";
import Pagination from "./Pagination";

const Dashboard = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [pageBtns, setPageBtns] = useState([]);

  useEffect(() => {
    getDataFromApi();
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(tempData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tempData.length / 10));
  }, [itemOffset, tempData]);
  useEffect(() => {
    let arrSample = [];
    for (let i = 0; i < pageCount; i++) {
      arrSample.push(i + 1);
    }
    setPageBtns(arrSample);
  }, [pageCount]);
  const getDataFromApi = async () => {
    const result = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const dataWithChecked = result.data.map((elem) => {
      return { checked: false, ...elem };
    });
    setData(dataWithChecked);
    setTempData(dataWithChecked);
  };
  const handleSearch = (e) => {
    if (e.target.value != "") {
      const tempSearchValue = e.target.value.toLowerCase();
      const temp = data.filter(
        (elem) =>
          elem.name.includes(tempSearchValue) ||
          elem.email.includes(tempSearchValue) ||
          elem.role.includes(tempSearchValue)
      );
      setTempData(temp);
    } else {
      setTempData(data);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked == true) {
      const testData = tempData.map((elem) => {
        const exists = currentItems.find((el) => {
          return el.id == elem.id;
        });
        return exists ? { ...elem, checked: true } : { ...elem };
      });
      setTempData(testData);
    } else {
      const testData = tempData.map((elem) => {
        return { ...elem, checked: false };
      });
      setTempData(testData);
    }
  };
  const handleSelect = (e) => {
    const resultData = tempData.map((elem) => {
      if (elem.id == e.target.id) {
        return { ...elem, checked: !elem.checked };
      } else {
        return elem;
      }
    });
    setTempData(resultData);
  };
  const handleDelete = (e) => {
    const resultData = tempData.filter((elem) => {
      return elem.id != e.target.id;
    });
    setTempData(resultData);
    const mainData = data.filter((elem) => {
      return elem.id != e.target.id;
    });
    setData(mainData);
  };
  const handlePageClick = (event) => {
    if (
      event.target.textContent == "Previous" ||
      event.target.textContent == "Next"
    ) {
      if (event.target.textContent == "Previous" && itemOffset > 1) {
        setItemOffset(itemOffset == 11 ? itemOffset - 11 : itemOffset - 10);
      } else if (
        event.target.textContent == "Next" &&
        itemOffset < pageCount * 10 - 10
      ) {
        setItemOffset(itemOffset + 10);
      }
    } else {
      let pageNum = Number(event.target.textContent);
      pageNum == 1 ? setItemOffset(0) : setItemOffset(pageNum * 10 - 9);
    }
  };
  const handleDeleteAll = () => {
    const resultData = tempData.filter((elem) => {
      return elem.checked != true;
    });
    setTempData(resultData);
    const mainData = data.filter((elem) => {
      const exists = tempData.find((el) => {
        return el.id == elem.id;
      });
      return exists ? { ...elem } : undefined;
    });
    setData(mainData);
  };
  return (
    <>
      <input
        id="search-bar"
        type="search"
        placeholder="Search users using name, email or role"
        onChange={handleSearch}
      ></input>
      <table>
        <tr align="left">
          <input onClick={handleSelectAll} type="checkbox"></input>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th align="center">Actions</th>
        </tr>
        {currentItems ? (
          currentItems.map((elem) => {
            return (
              <>
                <Row
                  elem={elem}
                  handleSelect={handleSelect}
                  handleDelete={handleDelete}
                />
              </>
            );
          })
        ) : (
          <></>
        )}
      </table>
      <Pagination
        pageBtns={pageBtns}
        handleDeleteAll={handleDeleteAll}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
export default Dashboard;
