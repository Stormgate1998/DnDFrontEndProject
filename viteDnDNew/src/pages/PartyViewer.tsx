import { useParams } from "react-router-dom";
import {
  useGetCharactersForManyPlayersQuery,
  useGetCharactersQuery,
  useGetPartiesQuery,
} from "../hooks/characterHooks";
import { useEffect, useState } from "react";
import { Character } from "../objects/Character";
import { useAuth } from "react-oidc-context";
import { Party } from "../objects/Party";

export const PartyViewer: React.FC = () => {
  // Authentication hook
  const auth = useAuth();

  const party = useGetPartiesQuery();

  // // User ID from authentication
  const userId = auth.user?.profile.sub;

  // Extracting parameters from the URL
  const { partyInfo } = useParams();
  const usersCharacter = (partyInfo || "").split("c")[1];

  const [thisParty, setThisParty] = useState<Party>({
    id: partyInfo?.split("c")[0] ?? "",
    name: "New Party",
    gmId: "string",
    characterlist: [],
    playerlist: [],
  });
  useEffect(() => {
    console.log(partyInfo);
    console.log(party.data);
    const myParty = party.data?.find((p) => p.id === partyInfo?.split("c")[0]);
    if (myParty) {
      setThisParty(myParty);
    }
  }, [party.data, partyInfo]);

  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [playersCharacter, setPlayersCharacter] = useState<Character>();
  const playersCharacters = useGetCharactersQuery(userId ?? "");

  const charactersQuery = useGetCharactersForManyPlayersQuery(
    thisParty.playerlist
  );

  // const { messages, sendMessage } = useContext(WebsocketContext);
  // const [newMessage, setNewMessage] = useState("");

  // const handleSendMessage = () => {
  //   sendMessage(newMessage);
  //   setNewMessage("");
  // };

  useEffect(() => {
    console.log("DATA" + thisParty.characterlist);
    const isCharacterIdInList = (character: Character): boolean => {
      return thisParty.characterlist.some((c) => c === character.Id);
    };
    try {
      // Use the new hook for fetching characters for multiple players

      // Access the characters from the query
      // Check if characters is not undefined
      charactersQuery.data?.forEach((characterArray) => {
        characterArray.forEach((character) => {
          if (isCharacterIdInList(character)) {
            setCharacterList((prevList) => [...prevList, character]);
            console.log(
              `Character with Id ${character.Id} found in characterList`
            );
          }
        });
      });
    } catch (error) {
      console.error("Error fetching Characters:", error);
      // Handle error appropriately
    }
  }, [charactersQuery.data, thisParty.characterlist]);

  useEffect(() => {
    if (playersCharacters.data) {
      setPlayersCharacter(
        playersCharacters.data.filter((c) => c.Id === usersCharacter)[0]
      );
    }
  }, [playersCharacters.data, usersCharacter]);

  // Set player's character based on the logged-in user
  useEffect(() => {
    if (usersCharacter) {
      const PlayersCharacter = characterList.filter(
        (c) => c.Id === usersCharacter
      );
      if (PlayersCharacter.length > 0) {
        setPlayersCharacter(PlayersCharacter[0]);
      }
    }
  }, [characterList, usersCharacter]);

  return (
    <div>
      <h1>{thisParty.name}</h1>
      <p>{charactersQuery.data?.length}</p>
      {/* Display list of characters */}
      {characterList &&
        characterList.map((character) => (
          <div className="border" key={character.Id}>
            <p key={character.Id}>{character.Name}</p>
            <p>{character.Race}</p>
            <p>{character.TemporaryHitpoints}</p>
          </div>
        ))}

      {/* Display player's character details if available */}
      {playersCharacter && (
        <div className="border">
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
      {/* <div>
        <h2>Chat</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div> */}
    </div>
  );
};
