import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDataAndBins } from "../actions";
import { defaultData } from "../config";

export const useChivesData = () => {
  // state mgmt
  const storedGeojson = useSelector((state) => state.storedGeojson);
  const features = storedGeojson?.features || [];
  const dispatch = useDispatch();

  // data loading
  const handleData = async () => {
    if (features.length === 0) {
      const data = await fetch(
        `${process.env.PUBLIC_URL}/geojson/${defaultData}`
      ).then((r) => r.json());
      
      dispatch(loadDataAndBins(data));
    }
  };
  useEffect(() => {
    if (!(features && features.length)) {
      handleData();
    }
    // eslint-disable-next-line
  }, []);

  return {
    features,
    storedGeojson,
  };
};
