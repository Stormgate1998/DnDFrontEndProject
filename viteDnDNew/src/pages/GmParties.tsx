import React from "react";
import { useGetUserGmPartiesQuery } from "../hooks/characterHooks";
import { useDeleteParty } from "../hooks/characterHooks";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
      {parties.data?.map((party) => (
        <div className="row justify-content-center" key={party.id}>
          <div className="col-auto border rounded py-3">
            <h3>Party: {party.name}</h3>
            <Link to={`/gamePage/${party.id}c0`} className="nav-link my-2 ">
              <h2>Go to Party Viewer</h2>
            </Link>

            <div
              className="btn btn-primary"
              onClick={() => {
                deleteParty
                  .mutateAsync(party)
                  .then(() => toast.success("Deleted Character"));
              }}
            >
              Delete
            </div>
            <Toaster />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GmParties;
