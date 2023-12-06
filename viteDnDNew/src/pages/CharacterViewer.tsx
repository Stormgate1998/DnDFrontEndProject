import React, { useEffect, useState } from "react";
import "../App.css";
import { Character } from "../objects/Character";
import {
  useDeleteCharacters,
  useGetCharactersQuery,
} from "../hooks/characterHooks";
import { Link, useParams } from "react-router-dom";
import PartySelector from "./PartyAdder";
import { useAuth } from "react-oidc-context";
import toast, { Toaster } from "react-hot-toast";

interface ViewerProps {}

export const CharacterViewer: React.FC<ViewerProps> = () => {
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
  const [character, setCharacter] = useState<Character | null>(null);
  const getCharacter = useGetCharactersQuery(
    userId !== undefined ? userId : ""
  );
  const deleteCharacter = useDeleteCharacters();
  const { characterId: characterIdParam } = useParams();

  useEffect(() => {
    // Retrieve character data from local storage
    const foundCharacter = getCharacter.data?.filter(
      (char) => char.Id === characterIdParam
    );

    // If a character is found, set it using setCharacter
    if (foundCharacter && foundCharacter.length > 0) {
      setCharacter(foundCharacter[0]);
    }
  }, [characterIdParam, getCharacter.data]);

  return (
    <div className="App">
      <header className="App-header">
        {character ? (
          <div>
            <div
              className="btn btn-primary"
              onClick={() => deleteCharacter.mutateAsync(character).then(() => toast.success("Deleted Character"))}
            >
              Delete Character
            </div>
            <Toaster/>
            {character.PartyId.length > 0 ? (
              <Link
                to={`/gamePage/${character.PartyId}c${character.Id}`}
                className="nav-link"
              >
                <div className="btn btn-primary">Go To Party Viewer</div>
              </Link>
            ) : (
              <PartySelector characterId={character.Id} />
            )}

            <h2>Name: {character.Name}</h2>
            <p>Class: {character.Class.class}</p>
            <p>Level: {character.Class.level}</p>
            <p>Background: {character.Background}</p>
            <p>Race: {character.Race}</p>
            <p>Alignment: {character.Alignment}</p>
            <p>
              Strength: {character.Strength} (
              {Math.floor((character.Strength - 10) / 2)})
            </p>
            <p>
              Dexterity: {character.Dexterity} (
              {Math.floor((character.Dexterity - 10) / 2)})
            </p>
            <p>
              Constitution: {character.Constitution} (
              {Math.floor((character.Constitution - 10) / 2)})
            </p>
            <p>
              Intelligence: {character.Intelligence} (
              {Math.floor((character.Intelligence - 10) / 2)})
            </p>
            <p>
              Wisdom: {character.Wisdom} (
              {Math.floor((character.Wisdom - 10) / 2)})
            </p>
            <p>
              Charisma: {character.Charisma} (
              {Math.floor((character.Charisma - 10) / 2)})
            </p>

            <p>Max Hitpoints: {character.MaxHitpoints}</p>
            <p>Current Hitpoints: {character.CurrentHitpoints}</p>
            <p>Temporary Hitpoints: {character.TemporaryHitpoints}</p>
            <p>Hit Dice: {character.HitDice}</p>
            <p>Death Saves Successes: {character.DeathSaves.successes}</p>
            <p>Death Saves Failures: {character.DeathSaves.failures}</p>
            <p>Speed: {character.Speed}</p>
            <p>Armor Class: {character.ArmorClass} </p>
            <p>Initiative: {character.Initiative}</p>
            <p>
              Traits:{" "}
              {character.Traits.length > 0
                ? character.Traits.join(", ")
                : "None"}
            </p>
          </div>
        ) : (
          <p>No character data found.</p>
        )}
      </header>
    </div>
  );
};
