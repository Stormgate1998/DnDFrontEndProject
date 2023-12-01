import React, { useState } from "react";
import "../App.css";
import { Party } from "../objects/Party";
import { useAddPartyQuery } from "../hooks/characterHooks";
import { useAuth } from "react-oidc-context";
import toast from "react-hot-toast";

interface ViewerProps {}

export const PartyMaker: React.FC<ViewerProps> = () => {
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
  const [name, setName] = useState("");
  const gmId = userId !== undefined ? userId : "";
  const characterlist: string[] = []; // Empty characterlist
  const playerlist: string[] = [];
  const id: string = Date.now().toString();
  const addParty = useAddPartyQuery();

  const handleSubmit = () => {
    const newParty: Party = { id, gmId, name, characterlist, playerlist };
    addParty.mutateAsync(newParty).then(() => toast.success("Added Party"));
    setName("");
  };

  return (
    <div>
      <label>
        Party Name:
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
