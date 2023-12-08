import "../App.css";

import React, { useEffect, useState } from "react";
import { Character } from "../objects/Character";
import InputBox from "../components/Input/InputBox";
import {
  useEditCharacters,
  useGetCharactersQuery,
} from "../hooks/characterHooks";
import { useAuth } from "react-oidc-context";
import StatBlock from "../components/StatBlock";
import InputBoxWithType from "../components/Input/InputBoxWithType";
import toast, { Toaster } from "react-hot-toast";
import PageBreak from "../components/Display/PageBreak";
import ShortSnippet from "../components/Display/DisplayShortSnippet";
import { useNavigate, useParams } from "react-router-dom";

export const CharacterEditor = () => {
  const navigate = useNavigate();
  const { characterId: characterIdParam } = useParams();
  const editCharacter = useEditCharacters();
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
  const getCharacters = useGetCharactersQuery(userId ?? "");

  useEffect(() => {
    const myCharacter = getCharacters.data?.find(
      (c) => c.Id === characterIdParam
    );
    if (myCharacter) {
      console.log("IMPORT: ", myCharacter);
      setCharacter(myCharacter);
    }
  }, [characterIdParam, getCharacters.data]);

  const [character, setCharacter] = useState<Character>({
    PlayerId: userId !== undefined ? userId : "",
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
    MaxHitpoints: 0,
    CurrentHitpoints: 0,
    TemporaryHitpoints: 0,
    HitDice: "",
    DeathSaves: { successes: 0, failures: 0 },
    Name: "",
    Background: "",
    Alignment: "",
    Class: { class: "", level: 0 },
    Race: "",
    Speed: 0,
    ArmorClass: 0,
    Initiative: 0,
    Traits: [],
    Id: Date.now().toString(),
    PartyId: "",
    Acrobatics: 0,
    Animal_Handling: 0,
    Arcana: 0,
    Athletics: 0,
    Deception: 0,
    History: 0,
    Insight: 0,
    Intimidation: 0,
    Investigation: 0,
    Medicine: 0,
    Nature: 0,
    Perception: 0,
    Performance: 0,
    Persuasion: 0,
    Religion: 0,
    Sleight_of_hand: 0,
    Stealth: 0,
    Survival: 0,
  });

  const [classLevelChoice, setClassLevelChoice] = useState(0);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({ ...prevCharacter, [name]: value }));
  };

  const handleSave = async () => {
    // Save character to local storage
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      CurrentHitpoints: prevCharacter.MaxHitpoints,
    }));
    await editCharacter.mutateAsync(character).then(() => {
      toast.success("Successfully Edited Character");
      navigate(`/character/${character.Id}`);
      //Redirect to /character/charcter.Id
    });
  };


  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      Class: { ...prevCharacter.Class, level: classLevelChoice },
    }));
  }, [classLevelChoice]);

  return (
    <>
      <Toaster />
      <div className="container">
        <div className="bg-dark-subtle px-3 rounded-3">
          <h1 className="text-secondary">Character Builder</h1>
          <p className="fst-italic">Note: Due to how integral it is to a character, we currently are not allowing the change of class or race. If you want a character with different attributes, you are free to create another</p>
          <PageBreak text="Basic Information" />
          <div className="row">
            <ShortSnippet>
              <InputBox
                name="Name"
                type="text"
                value={character.Name}
                onChange={handleChange}
              />
            </ShortSnippet>

            <ShortSnippet>
              <InputBox
                name="Level"
                type="number"
                value={character.Class.level}
                onChange={(e) => setClassLevelChoice(parseInt(e.target.value))}
              />
            </ShortSnippet>
          </div>

          <PageBreak text="Personality" />
          <div className="row">
            <ShortSnippet>
              <InputBox
                name="Background"
                type="text"
                value={character.Background}
                onChange={handleChange}
              />
            </ShortSnippet>
            <ShortSnippet>
              <InputBox
                name="Alignment"
                type="text"
                value={character.Alignment}
                onChange={handleChange}
              />
            </ShortSnippet>
          </div>
          <PageBreak text="Combat Information" />
          <div className="row">
            <ShortSnippet>
              <InputBox
                name="Speed"
                type="number"
                value={character.Speed}
                onChange={handleChange}
              />
            </ShortSnippet>
            <ShortSnippet>
              <InputBoxWithType<Character>
                name="ArmorClass"
                type="number"
                value={character.ArmorClass}
                onChange={handleChange}
              />
            </ShortSnippet>
            <ShortSnippet>
              <InputBoxWithType<Character>
                name="Initiative"
                type="number"
                value={character.Initiative}
                onChange={handleChange}
              />
            </ShortSnippet>
            <ShortSnippet>
              <InputBoxWithType<Character>
                name="MaxHitpoints"
                type="number"
                value={character.MaxHitpoints}
                onChange={handleChange}
              />
            </ShortSnippet>
            <ShortSnippet>
              <InputBoxWithType<Character>
                name="HitDice"
                type="text"
                value={character.HitDice}
                onChange={handleChange}
              />
            </ShortSnippet>
          </div>
        </div>

        <PageBreak text="Stats" />
        <div className="row">
          <ShortSnippet>
            <StatBlock
              attributeName="Strength"
              boxValue={character.Strength}
              onBoxChange={handleChange}
            />
          </ShortSnippet>
          <ShortSnippet>
            <StatBlock
              attributeName="Dexterity"
              boxValue={character.Dexterity}
              onBoxChange={handleChange}
            />
          </ShortSnippet>
          <ShortSnippet>
            <StatBlock
              attributeName="Constitution"
              boxValue={character.Constitution}
              onBoxChange={handleChange}
            />
          </ShortSnippet>
          <ShortSnippet>
            <StatBlock
              attributeName="Intelligence"
              boxValue={character.Intelligence}
              onBoxChange={handleChange}
            />
          </ShortSnippet>
          <ShortSnippet>
            <StatBlock
              attributeName="Wisdom"
              boxValue={character.Wisdom}
              onBoxChange={handleChange}
            />
          </ShortSnippet>
          <ShortSnippet>
            <StatBlock
              attributeName="Charisma"
              boxValue={character.Charisma}
              onBoxChange={handleChange}
            />
          </ShortSnippet>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          Save Character
        </button>
      </div>
    </>
  );
};
