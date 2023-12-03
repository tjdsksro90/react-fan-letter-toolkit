import * as St from "assets/BasicStyle";
import { useState } from "react";
import Form from "./container/Form";
import List from "./container/List";
import Search from "./container/Search";

function Container({ tab }) {
  // 검색기능
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <St.MainWrap>
      <St.BasicWrap>
        <Form tab={tab} />
        <Search search={search} searchHandler={searchHandler} />
        <List tab={tab} search={search} />
      </St.BasicWrap>
    </St.MainWrap>
  );
}

export default Container;
