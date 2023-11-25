import React from "react";
import { useGetUserGmPartiesQuery } from "../hooks/characterHooks";
import { useDeleteParty } from "../hooks/characterHooks";
import { useAuth } from "react-oidc-context";
const GmParties: React.FC = () => {
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
  const gmId = userId !== undefined ? userId : ""; // Replace with your actual gmId or get it dynamically
  const deleteParty = useDeleteParty(gmId);
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
        <div className="row">
          <div key={party.id}>
            <h3>Party: {party.name}</h3>
            <ul>
              {party.characterlist.map((character, index) => (
                <li key={index}>{character}</li>
              ))}
            </ul>
            <div
              className="btn btn-primary"
              onClick={() => {
                deleteParty.mutate(party);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GmParties;
