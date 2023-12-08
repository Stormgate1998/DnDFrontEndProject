import React from "react";
import { Character } from "../../objects/Character";

interface PlayerDisplayProps {
  character: Character;
}
const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ character }) => {
  return (
    <div
      className={`col ${character.CurrentHitpoints < 20 ? "glow" : ""}`}
      key={character.Id}
    >
      <div className="border rounded p-3">
        <p>{character.Name}</p>
        <p>{character.Race}</p>
        <p>{character.CurrentHitpoints}</p>
      </div>
    </div>
  );
};

export default PlayerDisplay;
