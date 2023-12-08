import React from "react";
const CenteredHeading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <h2 className="text-center">{text}</h2>
        </div>
      </div>
    </div>
  );
};

export default CenteredHeading;
