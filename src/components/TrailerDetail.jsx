import React from "react";

const TrailerDetail = ({ data }) => {
  return (
    <>
      <div className="trailer">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${data}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: "none" }}
        />
      </div>
    </>
  );
};

export default TrailerDetail;
