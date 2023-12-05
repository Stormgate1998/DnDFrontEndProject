import { useParams } from "react-router-dom";
import {
  useEditCharacters,
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

  // const [characterList, setCharacterList] = useState<Character[]>([]);
  const [playersCharacter, setPlayersCharacter] = useState<Character>();
  const playersCharacters = useGetCharactersQuery(userId ?? "");
  const [newHitpoints, setNewHitpoints] = useState(0);
  const editPlayerCharacter = useEditCharacters();

  const handleHitpointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHitpoints(parseInt(e.target.value));
  };

  const handleUpdateHitpoints = () => {
    const newValue = newHitpoints;

    if (playersCharacter) {
      setPlayersCharacter((prevCharacter: Character | undefined) => ({
        ...prevCharacter!,
        CurrentHitpoints: newValue,
      }));

      // Update characterList

      // setcharacterlist to same, but where character.id == playersCharacter.Id, update CurrentHitpoints
      editPlayerCharacter
        .mutateAsync({
          ...playersCharacter,
          CurrentHitpoints: newValue,
        })
        .then(() => {
          console.log(`Updating character hitpoints to ${newHitpoints}`);
          const thispage = window.location.href;
          window.location.href = thispage; // Redirect to the current page
        });
    }
  };

  const charactersforPlayersInPartyQuery = useGetCharactersForManyPlayersQuery(
    thisParty.playerlist
  );

  // const { messages, sendMessage } = useContext(WebsocketContext);
  // const [newMessage, setNewMessage] = useState("");

  // const handleSendMessage = () => {
  //   sendMessage(newMessage);
  //   setNewMessage("");
  // };
  const isCharacterIdInList = (character: Character): boolean => {
    return thisParty.characterlist.some((c) => c === character.Id);
  };
  const nestedcharacterList: Character[][] =
    charactersforPlayersInPartyQuery.data?.map((playersCharactersArray) => {
      const playerCharactersInParty = playersCharactersArray.filter((c) =>
        isCharacterIdInList(c)
      );
      return playerCharactersInParty;
    }) ?? [];
  const emptyList: Character[] = [];
  const characterList = emptyList.concat(...nestedcharacterList);

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
      {characterList && (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {characterList.map((character) => (
            <div
              className={`col ${character.CurrentHitpoints < 20 ? "glow" : ""}`}
              key={character.Id}
            >
              <div className="border rounded p-3">
                <p key={character.Id}>{character.Name}</p>
                <p>{character.Race}</p>
                <p>{character.CurrentHitpoints}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display player's character details if available */}
      {playersCharacter && (
        <div className="border my-4">
          <h2>{playersCharacter.Name}</h2>
          <h2>{playersCharacter.Race}</h2>
          <h2>
            {playersCharacter.Class.class}, {playersCharacter.Class.level}
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
          />
          <button onClick={() => handleUpdateHitpoints()}>
            Update Hitpoints
          </button>
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
