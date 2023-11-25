//Contains:
/*
List of user-started campaigns
List of user-created characters
Ability to delete either of them
Ability to create party

 */

import GmParties from "./GmParties";
import { UserCharacterList } from "./UserCharacterList";

export const UserPage = () => {
  return (
    <div>
      <UserCharacterList />
      <GmParties />
    </div>
  );
};
