import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import DataDetailed from "../../components/DataDetailed/DataDetailed";
import {
  getDataByIdAction,
  setClickedData,
} from "../../redux/data/data-actions";
import "./DataPage.scss";

const DataPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [data, setData] = useState(null);
  const dataID = pathname.startsWith("/data/")
    ? pathname.split("/data/")[1]
    : null;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [userError, setUserError] = useState();

  const getDataById = useCallback(
    async (dataID) => {
      setUserError(null);
      try {
        if (dataID) {
          const clickedDataRes = await dispatch(getDataByIdAction(dataID));
          // dispatch(setClickedDataAction(clickedDataRes));
          setData(clickedDataRes);
        } else {
          setUserError(true);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(true);
    dataID && getDataById(dataID).then(() => setIsLoading(false));
  }, [dataID, getDataById]);

  useEffect(() => {
    return () => {
      dispatch(setClickedData());
    };
  }, [dispatch]);

  if (error) {
    return (
      <div className="DataPage">
        <p className="error-text">
          Une erreur est survenue pour récupérer cette publication. Merci de
          vérifier le lien puis de réessayer.
        </p>
        <Link to="/">
          <CustomButton level="secondary">Revenir à l'accueil</CustomButton>
        </Link>
      </div>
    );
  }

  return <div className="DataPage">{data && <DataDetailed data={data} />}</div>;
};

export default DataPage;
