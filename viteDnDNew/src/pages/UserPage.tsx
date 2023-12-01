//Contains:
/*
List of user-started campaigns
List of user-created characters
Ability to delete either of them
Ability to create party
A way to store the user's preferred name in local storage, instead of the Keycloak name. ELEPHANT
 */

import { useState } from "react";
import GmParties from "./GmParties";
import { PartyMaker } from "./PartyMaker";
import { UserCharacterList } from "./UserCharacterList";
import InputBox from "../components/InputBox";

export const UserPage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("Preferred", inputValue);
  };
  return (
    <div>
      <h2>Your Characters</h2>
      <UserCharacterList />
      <h2>Your Parties</h2>
      <GmParties />
      <h2>Create a Party</h2>
      <PartyMaker />

      <div className="container mt-4">
        <InputBox
          type="text"
          name="Preferred Name"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
