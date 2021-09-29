import logo from "./logo.svg";
import React , {useEffect,useState} from "react";
import "./Components/style.css";
import { FiChevronLeft } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import Data from "./Components/data";
import List from "./Components/List";
import Total from "./Components/Total";
import Toast from "./Components/Toast";
function App() {
  const [data, setData] = useState([]);
  const [toast, setToast] = useState([]);
  
  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const cartData = Data.map((item) => {
        return { ...item, count: 1 };
      });
      setData(cartData);
      storeData(cartData);
    }
  }, []);

  const removeToastItems = (id) => {
    const newMessages = [];
    setToast(newMessages);
  };

  const addToastItem = (id, message) => {
    const newToast = [...toast, { id, message }];
    setToast(newToast);
    removeToastTimeout(id);
  };

  const removeToastTimeout = (id) => {
    setTimeout(() => {
      removeToastItems(id);
    }, 1000);
  };

  const storeData = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const changeItemCount = (id, value) => {
    const changedData = data.map((item) => {
      if (item.id === id) {
        if (item.count + value >= 0) {
          item.count += value;
        }
      }
      return item;
    });
    setData(changedData);
    storeData(changedData);
  };

  const deleteItem = (id, name) => {
    const changedData = data.filter((item) => item.id !== id);
    setData(changedData);
    storeData(changedData);
    addToastItem(id, `${name} deleted successfully`);
  };
   const resetData = () => {
    const cartData = Data.map((item) => {
      return { ...item, count: 1 };
    });
    setData(cartData);
    storeData(cartData);
  };

  return (
    <div className="center">
      <div className="heading">
        <FiChevronLeft />
        Order Summary
      </div>
      <div className="container">
      {/* List of Orders : List.js*/}       
        <List
          data={data}
          changeItemCount={changeItemCount}
          deleteItem={deleteItem}/>
       <Total data={data}/>
      </div>

      {/* Total Orders : Total.js*/}

      {/* Reset */}
       <div onClick={resetData} className="reset-btn">
        <GrPowerReset />
      </div>
      {/* Toast Message */}
       <Toast message={toast} removeItem={removeToastTimeout} />
    </div>
  );
}

export default App;
