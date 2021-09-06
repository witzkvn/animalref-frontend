export const getSearchApiUrl = (searchParamsObj) => {
  if (searchParamsObj) {
    return `${
      searchParamsObj?.searchWords
        ? "&text[search]=" + encodeURI(searchParamsObj.searchWords)
        : ""
    }${
      searchParamsObj?.searchOrder
        ? "&sort=" + searchParamsObj?.searchOrder
        : ""
    }${
      searchParamsObj?.searchCategory?.length > 0
        ? "&category=" + searchParamsObj?.searchCategory.join(",")
        : ""
    }${
      searchParamsObj?.searchPage ? "&page=" + searchParamsObj.searchPage : ""
    }`.trim();
  }
  return "";
};
