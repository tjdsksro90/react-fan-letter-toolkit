import * as St from "assets/BasicStyle";

function Search({ search, searchHandler }) {
  return (
    <St.SearchWrap>
      <St.SearchSapn>
        <input
          type="text"
          placeholder="search name"
          value={search}
          onChange={searchHandler}
        />
      </St.SearchSapn>
    </St.SearchWrap>
  );
}

export default Search;
