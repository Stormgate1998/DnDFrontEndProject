import React, { useState } from "react";
import "../App.css";
import { Party } from "../objects/Party";
import { useAddPartyQuery } from "../hooks/characterHooks";

interface ViewerProps {}

export const PartyMaker: React.FC<ViewerProps> = () => {
  const [name, setName] = useState("");
  const gmId = "testId"; // Hardcoded gmId
  const characterlist: string[] = []; // Empty characterlist
  const id: string = Date.now.toString();
  const addParty = useAddPartyQuery();

  const handleSubmit = () => {
    const newParty: Party = { id, gmId, name, characterlist };
    addParty.mutate(newParty);
  };

  return (
    <div>
      <label>
        Party Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
