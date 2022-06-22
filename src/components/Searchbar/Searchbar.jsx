import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getSearchApiUrl } from "../../helper/functions/getSearchApiUrl";
import { getAllDatasAction } from "../../redux/data/data-actions";
// import { getSearchApiUrl } from "../../helper/functions/getSearchApiUrl";
// import { getAllRecipesAction } from "../../redux/recipes/recipes-actions";
import { setSearchParams } from "../../redux/search/search-actions";
import { selectSearchParams } from "../../redux/search/search-selectors";
import CustomButton from "../CustomButton/CustomButton";
// import SearchFilters from "../SearchFilters/SearchFilters";Z

import "./Searchbar.scss";

const Searchbar = () => {
  const searchObj = useSelector(selectSearchParams);
  const dispatch = useDispatch();
  const searchInputEl = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleChange = (e) => {
    const newSearch = e.target.value;
    dispatch(
      setSearchParams({
        searchWords: newSearch,
      })
    );
  };

  const fetchDatas = useCallback(
    async (fetchUrl) => {
      setError(null);
      try {
        await dispatch(getAllDatasAction(fetchUrl));
      } catch (error) {
        setError(error?.response?.data?.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDatas(getSearchApiUrl(searchObj));
    if (searchInputEl?.current) searchInputEl.current.value = "";
  };

  return (
    <>
      <form className="Searchbar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recherche..."
          onChange={handleChange}
          value={searchObj?.searchWords}
          ref={searchInputEl}
        />
        <CustomButton level="primary">
          <IoSearch className="logo-md" />
        </CustomButton>
      </form>
    </>
  );
};

export default Searchbar;
