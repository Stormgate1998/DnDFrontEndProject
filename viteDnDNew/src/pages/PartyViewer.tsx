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
  const partyId = useParams();
  const protectedPartyId = String(partyId) ?? "";
  const party = useGetPartiesQuery();
  const [characterList, setCharacterList] = useState<Character[]>([]);
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

      // Check if characters is not undefined
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

  //display the characters in a grid thing, display name, race, class, and temporary hp, the whole shebang
  //get characterid from parameters
  // <Route path="/yourRoute/:variable1/:variable2" component={YourComponent} />
  // const { variable1, variable2 } = useParams();
  // If it exists, display more information below about your character
  //otherwise, don't (?)

  return (
    <div>
      <h1>{thisParty.id}</h1>
      <p>This is a basic React component.</p>
      <p>{auth.user?.profile.sub}</p>
      <ul>
        {characterList &&
          characterList.map((character) => (
            <li key={character.Id}>{character.Name}</li>
          ))}
      </ul>
    </div>
  );
};
