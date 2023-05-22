import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../../context/Context';
import { getShowTypes } from '../../helpers/getShowType';
import Loader from '../../helpers/Loader';
import TrailerDetail from '../../components/TrailerDetail';
import Recommendations from '../../components/Recommendations';
import DetailsPC from '../../components/DetailsPC';
import DetailsMobile from '../../components/DetailsMobile';

const ShowDetailList = () => {
  const { getDetailsData, allDetailsData } = useContext(DataContext);
  const { detailsData, actorsData, trailerKey, recommendationsData } = allDetailsData;
  const { showType, showId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDetailsData(getShowTypes(showType), showId);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showId]);

  return (
    <>
      {allDetailsData == '' || isLoading ? (
        <Loader />
      ) : (
        <div className="showDetails">
          {isWideScreen ? (
            <DetailsPC detailsData={detailsData} actorsData={actorsData} />
          ) : (
            <DetailsMobile detailsData={detailsData} actorsData={actorsData} />
          )}

          {trailerKey == undefined ? (
            ''
          ) : (
            <div className="moreDetailsContainer">
              <p className="detailsHeader">Media</p>
              <div className="hLine"></div>
              <TrailerDetail data={trailerKey} />
            </div>
          )}
          <div className="moreDetailsContainer">
            <p className="detailsHeader">Recommendations</p>
            <div className="hLine"></div>
            <Recommendations data={recommendationsData} type={getShowTypes(showType)} />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowDetailList;
