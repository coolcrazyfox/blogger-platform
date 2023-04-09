import React, { useState } from "react";
import debounce from "lodash.debounce";
import SuperSelect from "./UI/SuperSelect/SuperSelect";
import { AiOutlineClear } from "react-icons/ai";
import { initialState } from "./NavBar";
import SuperInput from "./UI/SuperInput/SuperInput";
import { ImSearch } from "react-icons/im";
import { AppContext } from "../App";
import s from "../styles/Search.module.css";

const Search = ({ options, filter, setFilter }) => {
  const [inform, setInform] = useState(initialState);
  const info = inform[1];
  const inputRef = React.useRef();
  const onClickClearHandler = () => {
    setFilter({ ...filter, query: "" });
    inputRef.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((string) => {
      setFilter({ ...filter, query: string });
    })
  );
  const onChangeInputFilterHandler = (e) => {
    setFilter({ ...filter, query: e.target.value });
  };

  // const handlerEnterSearch =(e)=>{
  //     setSearchTerm(e.target.value)
  //     onChange(e.target.value)
  //     // console.log(searchTerm)
  //     // onChange(e.target.value)
  //     if (e.key ==="Enter" || e.onClick){
  //         console.log(searchTerm)
  //         onChange(searchTerm)
  //     }
  // }

  return (
    <div className={s.search}>
      <div className={s.title}> {info.title}</div>
      <div className={s.search_box}>
        <div className={s.search_input_form}>
          <span className={s.loop}>
            <ImSearch />
          </span>
          <SuperInput
            ref={inputRef}
            value={filter.query}
            onChange={onChangeInputFilterHandler}
            type="text"
            placeholder={"Search"}
            // setSearchQuery={setSearchQuery}
          />
          {filter.query && (
            <div className={s.clear}>
              <AiOutlineClear onClick={onClickClearHandler} />
            </div>
          )}
        </div>
        <SuperSelect
          options={options}
          value={filter.sort}
          onChange={(selectedSort) =>
            setFilter({ ...filter, sort: selectedSort })
          }
        />
      </div>
    </div>
  );
};

export default Search;
