import React from "react";
import { useGetUserGmPartiesQuery } from "../hooks/characterHooks";

const GmParties: React.FC = () => {
  // You can provide the gmId dynamically or fetch it from your component state or props
  const gmId = "testId"; // Replace with your actual gmId or get it dynamically

  const parties = useGetUserGmPartiesQuery(gmId);

  if (parties.isLoading) {
    return <p>Loading...</p>;
  }
  if (parties.error) {
    return <div>error</div>;
  }
  if (!parties.data) {
    return <div></div>;
  }
  return (
    <div>
      <h2>Parties List</h2>
      {parties.data?.map((party) => (
        <div key={party.id}>
          <h3>Party: {party.name}</h3>
          <ul>
            {party.characterlist.map((character, index) => (
              <li key={index}>{character}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GmParties;
