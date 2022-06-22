import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataPreview from "../../components/DataPreview/DataPreview";
import "./HomePage.scss";
// import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import { selectDatasArray } from "../../redux/data/data-selectors";
import { getAllDatasAction } from "../../redux/data/data-actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const datasArray = useSelector(selectDatasArray);

  const fetchDatas = useCallback(async () => {
    setError(null);
    try {
      await dispatch(getAllDatasAction());
    } catch (error) {
      setError(error?.response?.data?.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchDatas().then(() => setIsLoading(false));
  }, [fetchDatas]);

  if (error) {
    return (
      <p>
        Une erreur est survenue :{" "}
        {error || "essayez de rafraichir la page ou de vous reconnecter."}
      </p>
    );
  }

  return (
    <div className="HomePage pageWrapWidth container-medium">
      <h2>Dernières publications</h2>
      <div className="HomePage__wrapper">
        {datasArray && datasArray.length > 0 ? (
          datasArray.map((data) => <DataPreview data={data} />)
        ) : (
          <p>Aucune données pour le moment...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
