import { useParams } from "react-router-dom";
import {
  useGetCharactersForManyPlayersQuery,
  useGetPartiesQuery,
} from "../hooks/characterHooks";
import { useEffect, useMemo, useState } from "react";
import { Character } from "../objects/Character";
import { useAuth } from "react-oidc-context";

export const PartyViewer: React.FC = () => {
  const auth = useAuth();
  const { combinedParam } = useParams();
  const [partyId = "", usersCharacter = ""] = (combinedParam || "").split("_");
  const protectedPartyId = String(partyId) ?? "";
  const party = useGetPartiesQuery();
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [playersCharacter, setPlayersCharacter] = useState<Character>();
  const thisParty = useMemo(() => {
    return party.data
      ? party.data.find((p) => p.id === protectedPartyId) ?? {
          id: protectedPartyId,
          name: "New Party",
          gmId: "string",
          characterlist: [],
          playerlist: [],
        }
      : {
          id: protectedPartyId,
          name: "New Party",
          gmId: "string",
          characterlist: [],
          playerlist: [],
        };
  }, [party.data, protectedPartyId]);
  const charactersQuery = useGetCharactersForManyPlayersQuery(
    thisParty.playerlist
  );

  useEffect(() => {
    try {
      // Use the new hook for fetching characters for multiple players

      // Access the characters from the query
      const characters = charactersQuery.data;

      // Check if characters is not undefnined
      if (characters) {
        // Filter characters based on characterlist
        for (const character of characters) {
          for (const id of thisParty.characterlist) {
            const matchingCharacters = character.filter((c) => c.Id == id);
            if (matchingCharacters.length > 0) {
              setCharacterList((prevCharacterList) => [
                ...prevCharacterList,
                ...matchingCharacters,
              ]);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching Characters:", error);
      // Handle error appropriately
    }
  }, [charactersQuery.data, thisParty]);

  if (usersCharacter) {
    const PlayersCharacter = characterList.filter(
      (c) => c.Id === usersCharacter
    );
    if (PlayersCharacter.length > 0) {
      setPlayersCharacter(PlayersCharacter[0]);
    }
  }

  return (
    <div>
      {usersCharacter && <div>{usersCharacter}</div>}
      <h1>{thisParty.name}</h1>
      <p>{auth.user?.profile.sub}</p>
      {characterList &&
        characterList.map((character) => (
          <div className="border" key={character.Id}>
            <p key={character.Id}>{character.Name}</p>
            <p>{character.Race}</p>
            <p>{character.TemporaryHitpoints}</p>
          </div>
        ))}

      {playersCharacter && (
        <div>
          <h2>{playersCharacter.Name}</h2>
          <h2>{playersCharacter.Race}</h2>
          <h2>
            {playersCharacter.Class.class}, {playersCharacter.Class.level}
          </h2>
          <h2>Hitpoints: {playersCharacter.CurrentHitpoints}</h2>
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
    </div>
  );
};
