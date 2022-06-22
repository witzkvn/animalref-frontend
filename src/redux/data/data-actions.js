import { client } from "../..";
import { openPopupMessageAction } from "../layout/layout-actions";
import { setCurrentPage, setTotalPages } from "../search/search-actions";
import { setCurrentUserAction } from "../user/user-actions";
import { DataActionTypes } from "./data-types";

export const setClickedData = (data) => ({
  type: DataActionTypes.SET_CLICKED_DATA,
  payload: data,
});

export const getDataByIdAction = (dataID) => {
  return async (dispatch) => {
    try {
      const res = await client().get(`data/${dataID}`);

      if (res.status >= 300) {
        throw new Error("Une erreur est survenue...");
      }
      if (res.data.data.data) {
        dispatch(setClickedData(res.data.data.data));
        return res.data.data.data;
      }
    } catch (error) {
      throw error;
    }
  };
};

export const setDatasArray = (datas) => ({
  type: DataActionTypes.SET_DATAS_ARRAY,
  payload: datas,
});

export const getAllDatasAction = (fetchUrl) => {
  return async (dispatch) => {
    try {
      const res = await client().get(
        `data/?fields=title,category,slug,description,refLink,createdAt,rating${
          fetchUrl ? fetchUrl : ""
        }`
      );

      if (res.status >= 300) {
        throw new Error("Une erreur est survenue...");
      }

      if (res.data.data.data) {
        dispatch(setDatasArray(res.data.data.data));
        dispatch(setTotalPages(res.data.totalPages));
        dispatch(setCurrentPage(res.data.page));
      }
    } catch (error) {
      throw error;
    }
  };
};

// export const getAllRecipesFromUserByIdAction = (userId) => {
//   return async (dispatch) => {
//     try {
//       const res = await client().get(`recipes/user/${userId}/?fields=title,slug,images,time,difficulty,ratingsAverage`)

//       if (res.status >= 300) {
//         throw new Error('Une erreur est survenue...')
//       }

//       if (res.data.data.data) {
//         dispatch(setRecipesArray(res.data.data.data))
//       }
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export const getFavoritesRecipesAction = () => {
//   return async (dispatch) => {
//     try {
//       const res = await client().get('recipes/fav')

//       if (res.status >= 300) {
//         throw new Error('Une erreur est survenue...')
//       }

//       if (res.data.data.data) {
//         dispatch(setRecipesArray(res.data.data.data))
//         dispatch(setTotalPages(res.data.totalPages))
//         dispatch(setCurrentPage(res.data.page))
//       }
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export const createRecipeAction = (recipeObj) => {
//   return async (dispatch) => {
//     try {
//       const formData = new FormData()
//       Array.from(recipeObj.images).forEach(img => {
//         formData.append('images', img)
//       })
//       Object.keys(recipeObj).map((key, index) => {
//         if (key === "images") return false
//         return formData.append(key, recipeObj[key])
//       })

//       const res = await client().post('recipes/', formData)

//       if (res.status >= 300) {
//         throw new Error('Une erreur est survenue...')
//       }

//       if (res.data.data.data) {
//         // dispatch(setRecipesArray(res.data.data.data))
//         console.log(res.data.data.data)
//       }
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export const updateRecipeByIdAction = (recipeObj, recipeId) => {
//   return async (dispatch) => {
//     try {
//       const formData = new FormData()
//       Array.from(recipeObj.images).forEach(img => {
//         formData.append('images', img)
//       })
//       Object.keys(recipeObj).map((key, index) => {
//         if (key === "images") return false
//         return formData.append(key, recipeObj[key])
//       })

//       const res = await client().patch(`recipes/modify/${recipeId}`, formData)

//       if (res.status >= 300) {
//         throw new Error('Une erreur est survenue...')
//       }

//     } catch (error) {
//       throw error
//     }
//   }
// }
// export const deleteRecipeByIdAction = (recipeId) => {
//   return async (dispatch) => {
//     try {
//       const res = await client().delete(`recipes/delete/${recipeId}`)

//       if (res.status >= 300) {
//         throw new Error('Une erreur est survenue...')
//       }
//       console.log(res)
//     } catch (error) {
//       console.log(error)
//       throw error
//     }
//   }
// }

export const toggleFavDataAction = (dataID) => {
  return async (dispatch) => {
    try {
      const res = await client().get(`data/fav/${dataID}`);

      if (res.status >= 300) {
        dispatch(openPopupMessageAction("error", "Une erreur est survenue..."));
        throw new Error("Une erreur est survenue...");
      }

      if (res.data.data.data) {
        dispatch(setCurrentUserAction(res.data.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data.data));
      }
    } catch (error) {
      dispatch(
        openPopupMessageAction(
          "error",
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Une erreur est survenue..."
        )
      );
      throw error;
    }
  };
};
