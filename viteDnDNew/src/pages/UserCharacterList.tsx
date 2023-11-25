import React from "react";
import "../App.css";
import { useGetCharactersQuery } from "../hooks/characterHooks";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

interface ViewerProps {}

export const UserCharacterList: React.FC<ViewerProps> = () => {
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
  const characterClient = useGetCharactersQuery(
    userId !== undefined ? userId : ""
  );

  if (characterClient.isLoading || !characterClient.data) {
    return <Spinner />;
  }
  if (characterClient.isError) {
    return <h3>There has been an error retrieving your characters</h3>;
  }
  return (
    <div className="App">
      <header className="App-header"></header>
      {characterClient.data &&
        characterClient.data.map((character) => (
          <Link
            to={`/character/${character.Id}`}
            className="nav-link border rounded border-3 my-3"
          >
            <div className="container">
              <h2>Name: {character.Name}</h2>
              <h3>Race: {character.Race}</h3>
              <h4>
                Class: Level {character.Class.level} {character.Class.class}
              </h4>
            </div>
          </Link>
        ))}
    </div>
  );
};
