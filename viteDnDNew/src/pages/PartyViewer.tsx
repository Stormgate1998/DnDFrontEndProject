import { useParams } from "react-router-dom";
import { useGetPartiesQuery } from "../hooks/characterHooks";

export const PartyViewer: React.FC = () => {
  const partyId = useParams();
  const protectedPartyId = String(partyId) ?? "";
  const party = useGetPartiesQuery();
  const thisParty = party.data
    ? party.data.find((p) => p.id === protectedPartyId) ?? {
        id: protectedPartyId,
        name: "New Party",
        gmId: "string",
        characterlist: [],
      }
    : {
        id: protectedPartyId,
        name: "New Party",
        gmId: "string",
        characterlist: [],
      };

  //make a list of characters
  //for each item in the party's character list
  //get the character, add to list
  //display the characters in a grid thing, the whole shebang
  //get characterid from parameters
  // <Route path="/yourRoute/:variable1/:variable2" component={YourComponent} />
  // const { variable1, variable2 } = useParams();
  // If it exists, display more information below about your character
  //otherwise, don't (?)

  return (
    <div>
      <h1>{thisParty.id}</h1>
      <p>This is a basic React component.</p>
    </div>
  );
};
