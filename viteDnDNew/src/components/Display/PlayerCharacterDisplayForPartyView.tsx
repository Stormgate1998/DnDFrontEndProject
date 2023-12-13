import React, { useContext, useEffect, useState } from "react";
import { Character } from "../../objects/Character";
import { useEditCharacters, queryClient } from "../../hooks/characterHooks";
import { WebsocketContext } from "../../WebsocketChatContext";

interface PlayerDisplayProps {
  character: Character;
  partyId: string;
}
const CharacterInfoComponent: React.FC<PlayerDisplayProps> = ({
  character,
  partyId,
}) => {
  const [newHitpoints, setNewHitpoints] = useState(0);
  const editPlayerCharacter = useEditCharacters();
  const context = useContext(WebsocketContext);
  const handleHitpointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHitpoints(parseInt(e.target.value));
  };

  const [playersCharacter, setPlayersCharacter] = useState<Character>();

  useEffect(() => {
    setPlayersCharacter(character);
  }, [character]);

  const handleUpdateHitpoints = () => {
    const newValue = newHitpoints;

    if (playersCharacter) {
      setPlayersCharacter((prevCharacter: Character | undefined) => ({
        ...prevCharacter!,
        CurrentHitpoints: newValue,
      }));

      editPlayerCharacter
        .mutateAsync({
          ...playersCharacter,
          CurrentHitpoints: newValue,
        })
        .then(() => {
          console.log(`Updating character hitpoints to ${newHitpoints}`);
          queryClient.invalidateQueries({ queryKey: ["characters"] });
          context.sendMessage(partyId + "_refreshlist99876");
        });
    }
  };
  return (
    <>
      {playersCharacter && (
        <div className="border my-4">
          <h2>{playersCharacter.Name}</h2>
          <h2>{playersCharacter.Race}</h2>
          <h2>
            {playersCharacter.Class.class.length > 0
              ? `${playersCharacter.Class.class},`
              : ""}{" "}
            {playersCharacter.Class.level}
          </h2>
          <h2>
            Hitpoints: {playersCharacter.CurrentHitpoints}/
            {playersCharacter.MaxHitpoints}
          </h2>
          <input
            type="number"
            placeholder="New Hitpoints"
            value={newHitpoints}
            onChange={handleHitpointsChange}
            className="form-control"
          />
          <div
            className="btn btn-primary"
            onClick={() => handleUpdateHitpoints()}
          >
            Update Hitpoints
          </div>
          <h2>
            Strength Modifier:{" "}
            {Math.floor((playersCharacter.Strength - 10) / 2)}
          </h2>
          <h2>
            Dexterity Modifier:{" "}
            {Math.floor((playersCharacter.Dexterity - 10) / 2)}
          </h2>
          <h2>
            Constitution Modifier:{" "}
            {Math.floor((playersCharacter.Constitution - 10) / 2)}
          </h2>
          <h2>
            Wisdom Modifier: {Math.floor((playersCharacter.Wisdom - 10) / 2)}
          </h2>
          <h2>
            Intelligence Modifier:{" "}
            {Math.floor((playersCharacter.Intelligence - 10) / 2)}
          </h2>
          <h2>
            Charisma Modifier:{" "}
            {Math.floor((playersCharacter.Charisma - 10) / 2)}
          </h2>
        </div>
      )}
    </>
  );
};

export default CharacterInfoComponent;
