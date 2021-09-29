import React from "react";
import OrderItem from "./Item";
import "./List.css";
function List({ data, changeItemCount, deleteItem }) {
  return (
    <div className="list-container">
      <div className="item-grid item-head">
        <div className="item">Items({data.length})</div>
        <div className="quantity">Qty</div>
        <div className="price">Price</div>
      </div>
      {
        data
          ? data.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                changeItemCount={changeItemCount}
                deleteItem={deleteItem}
              />
            ))
          : null
      }
    </div>
  );
}
export default List;