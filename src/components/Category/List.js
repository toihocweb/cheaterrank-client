import React from "react";
import Item from "./Item";

const List = () => {
  return (
    <div className="container">
      <div className="row">
        <Item
          title="Practice Javascript"
          lang="javascript"
          banner="assets/img/yua.jpg"
          path="/javascript"
        />
      </div>
    </div>
  );
};

export default List;
