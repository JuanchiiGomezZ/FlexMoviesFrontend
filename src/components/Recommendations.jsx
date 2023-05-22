import React from "react";
import noRecommendation from "../assets/images/NoRecommendation.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import scrollTopOnClick from "../helpers/scrollTopOnClick";

const Recommendations = ({ data}) => {
  const { showType } = useParams();

  return (
    <>
      {data.length == 0 ? (
        <p className="noRecommendations">Sorry but at the moment we do not have recommendations at the moment for this show.</p>
      ) : (
        <div className="recommendations">
          {data.map((data) => (
            <Link
              to={`/Show/${showType}/Detail/${data.id}`}
              className="cardRecommendation"
              key={data.id}
              onClick={() => {
                scrollTopOnClick();
              }}
            >
              {data.backdrop_path == undefined ? (
                <img src={noRecommendation} alt={data.title} />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
                  alt={data.title}
                />
              )}
              <div className="tittleRecommendation">
                <p>{data.title || data.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Recommendations;
