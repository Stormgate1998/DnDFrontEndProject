import React, { useState } from "react";
import { Party } from "../objects/Party";
import {
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "../hooks/characterHooks";
import { Spinner } from "../components/Spinner";
// Replace with the correct path
interface PartySelectorProps {
  characterId: string; // Assuming characterId is a string, adjust if necessary
}

const PartySelector: React.FC<PartySelectorProps> = ({ characterId }) => {
  const parties = useGetPartiesQuery();
  const updatePartyMutation = useUpdatePartyMutation();
  const [selectedParty, setSelectedParty] = useState<string>(""); // State to store the selected party

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParty(event.target.value);
  };

  const handleAddToParty = () => {
    if (selectedParty && characterId && parties.data) {
      // Find the selected party in the list
      const selectedPartyToUpdate = parties.data.filter(
        (party: Party) => party.id === selectedParty
      );

      if (selectedPartyToUpdate) {
        const updatedParty: Party = {
          ...selectedPartyToUpdate[0],
          characterlist: [
            ...selectedPartyToUpdate[0].characterlist,
            characterId,
          ],
        };
        // Call the updatePartyMutation to update the selected party with the new character
        updatePartyMutation.mutate(updatedParty);
      }
    }
  };

  if (parties.isLoading) {
    return <Spinner />;
  }
  if (parties.error) {
    return <div>Error</div>;
  }
  if (!parties.data) {
    return <div></div>;
  }
  return (
    <div className="form-control">
      <label>Select Party:</label>
      <select
        onChange={handleSelectChange}
        value={selectedParty}
        className="form-control"
      >
        <option value="" disabled>
          Select a Party
        </option>
        {parties.data.map((p: Party) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleAddToParty}>
        Add to Party
      </button>
    </div>
  );
};

export default PartySelector;
