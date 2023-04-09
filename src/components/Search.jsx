import React, { useState } from "react";
import s from "../styles/Search.module.css";
import SuperSelect from "./UI/SuperSelect/SuperSelect";
import { AiOutlineClear } from "react-icons/ai";
import { initialState } from "./NavBar";
import SuperInput from "./UI/SuperInput/SuperInput";
import { ImSearch } from "react-icons/im";
import { AppContext } from "../App";

const Search = ({ options, filter, setFilter }) => {
  const [inform, setInform] = useState(initialState);
  const info = inform[1];
  const inputRef = React.useRef();
  const onClickClearHandler = (e) => {
    setFilter({ ...filter, query: "" });
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
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
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
