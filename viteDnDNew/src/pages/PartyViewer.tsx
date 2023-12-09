import { useParams } from "react-router-dom";
import {
  useGetCharactersForManyPlayersQuery,
  useGetCharactersQuery,
  useGetPartiesQuery,
} from "../hooks/characterHooks";
import { useContext, useEffect, useState } from "react";
import { Character } from "../objects/Character";
import { useAuth } from "react-oidc-context";
import { Party } from "../objects/Party";
import { WebsocketContext } from "../WebsocketChatContext";
import PlayerDisplay from "../components/Display/PlayerDisplayForPartyView";
import CharacterInfoComponent from "../components/Display/PlayerCharacterDisplayForPartyView";

export const PartyViewer: React.FC = () => {
  // Authentication hook
  const auth = useAuth();
  const context = useContext(WebsocketContext);
  const party = useGetPartiesQuery();

  const [chatInput, setChatInput] = useState<string>("");

  const handleChatInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const handleSend = () => {
    if (chatInput) {
      context.sendMessage(thisParty.id + "_" + chatInput);
      setChatInput("");
    }
  };
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
if (thisParty) {
  localStorage.setItem("currentParty", thisParty.id);
}
},[thisParty])
  
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

  const charactersforPlayersInPartyQuery = useGetCharactersForManyPlayersQuery(
    thisParty.playerlist
  );

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
            <PlayerDisplay key={character.Id} character={character} />
          ))}
        </div>
      )}

      {/* Display player's character details if available */}

      {playersCharacter && (
        <CharacterInfoComponent
          character={playersCharacter}
          partyId={thisParty.id}
        />
      )}
      <div>
        <h2>Party Chat</h2>
        <div
          style={{
            width: 300,
            height: 400,
            border: "1px solid black",
            padding: 10,
            overflow: "auto",
          }}
        >
          {context.messages.map((message, idx) => (
            <div key={idx}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={handleChatInput}
          className="form-control"
        />
        <div className="btn btn-primary" onClick={handleSend}>
          Send
        </div>
      </div>
    </div>
  );
};
