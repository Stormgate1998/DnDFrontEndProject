import React, { useState } from "react";
import { Party } from "../objects/Party";
import {
  useEditCharacters,
  useGetCharactersQuery,
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "../hooks/characterHooks";
import { Spinner } from "../components/Spinner";
import { useAuth } from "react-oidc-context";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// Replace with the correct path
interface PartySelectorProps {
  characterId: string; // Assuming characterId is a string, adjust if necessary
}

const PartySelector: React.FC<PartySelectorProps> = ({ characterId }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const userId = auth.user?.profile.sub ?? "";
  const parties = useGetPartiesQuery();
  const characterList = useGetCharactersQuery(userId);
  const editCharacter = useEditCharacters();
  const updatePartyMutation = useUpdatePartyMutation();
  const [selectedParty, setSelectedParty] = useState<string>(""); // State to store the selected party

  const thisCharacter = characterList.data?.filter(
    (c) => c.Id === characterId
  )[0];
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
        if (selectedPartyToUpdate[0].characterlist.length > 0) {
          const existingCharacterIndex =
            selectedPartyToUpdate[0].characterlist.indexOf(characterId);

          if (existingCharacterIndex === -1) {
            const updatedParty: Party = {
              ...selectedPartyToUpdate[0],
              characterlist: [
                ...selectedPartyToUpdate[0].characterlist,
                characterId,
              ],

              playerlist: [
                ...new Set([...selectedPartyToUpdate[0].playerlist, userId]),
              ],
            };
            // Call the updatePartyMutation to update the selected party with the new character
            updatePartyMutation
              .mutateAsync(updatedParty)
              .then(() => toast.success("Updated Party"));
            if (thisCharacter) {
              const newCharacter = {
                ...thisCharacter,
                PartyId: updatedParty.id,
              };
              editCharacter.mutateAsync(newCharacter).then(() => navigate(-1));
            }
          }
        } else {
          const updatedParty: Party = {
            ...selectedPartyToUpdate[0],
            characterlist: [characterId],
            playerlist: [userId],
          };
          // Call the updatePartyMutation to update the selected party with the new character
          updatePartyMutation
            .mutateAsync(updatedParty)
            .then(() => toast.success("Deleted Character"));
          if (thisCharacter) {
            const newCharacter = {
              ...thisCharacter,
              PartyId: updatedParty.id,
            };
            editCharacter.mutateAsync(newCharacter).then(() => navigate(-1));
          }
        }
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
      <Toaster />
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
