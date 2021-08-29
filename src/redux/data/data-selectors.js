import { createSelector } from "reselect";

export const selectDatas = (state) => state.datas;

export const selectDatasErrors = createSelector(
  [selectDatas],
  (datas) => datas.errors && datas.errors
);
export const selectDatasArray = createSelector(
  [selectDatas],
  (datas) => datas.datasArray && datas.datasArray
);
export const selectClickedData = createSelector(
  [selectDatas],
  (datas) => datas.clickedData && datas.clickedRecipe
);
