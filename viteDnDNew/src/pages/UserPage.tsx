//Contains:
/*
List of user-started campaigns
List of user-created characters
Ability to delete either of them
Ability to create party
A way to store the user's preferred name in local storage, instead of the Keycloak name. ELEPHANT
 */

import GmParties from "./GmParties";
import { PartyMaker } from "./PartyMaker";
import { UserCharacterList } from "./UserCharacterList";

export const UserPage = () => {
  return (
    <div>
      <h2>Your Characters</h2>
      <UserCharacterList />
      <h2>Your Parties</h2>
      <GmParties />
      <h2>Create a Party</h2>
      <PartyMaker />
    </div>
  );
};
