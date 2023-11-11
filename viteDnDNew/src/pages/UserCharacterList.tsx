import React from "react";
import "../App.css";
import Navbar from "../components/NavBar";
import { useGetCharactersQuery } from "../hooks/characterHooks";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";

interface ViewerProps {}

export const UserCharacterList: React.FC<ViewerProps> = () => {
  const characterClient = useGetCharactersQuery("testId");

  if (characterClient.isLoading || !characterClient.data) {
    return <Spinner />;
  }
  if (characterClient.isError) {
    return <h3>There has been an error retrieving comments</h3>;
  }
  return (
    <div className="App">
      <Navbar />
      <header className="App-header"></header>
      {characterClient.data &&
        characterClient.data.map((character) => (
          <Link to={`/character/${character.Id}`} className="nav-link">
            <div className="container border-3">
              <h2>{character.Name}</h2>
              <h3>{character.Race}</h3>
              <h3>
                {character.Class.class} {character.Class.level}
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
};
