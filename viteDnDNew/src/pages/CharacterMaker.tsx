import "../App.css";

import React, { useEffect, useState } from "react";
import { Character } from "../objects/Character";
import InputBox from "../components/InputBox";
import { useAddCharacters } from "../hooks/characterHooks";
import { useAuth } from "react-oidc-context";
import StatBlock from "./StatBlock";

export const CharacterMaker = () => {
  const addCharacter = useAddCharacters();
  const auth = useAuth();
  const userId = auth.user?.profile.sub;
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
  const [classNameChoice, setClassNameChoice] = useState("");
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
    await addCharacter.mutateAsync(character);
    // Call the parent onSave function
  };

  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      Class: { ...prevCharacter.Class, class: classNameChoice },
    }));
  }, [classNameChoice]);

  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      Class: { ...prevCharacter.Class, level: classLevelChoice },
    }));
  }, [classLevelChoice]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <InputBox
              name="Name"
              type="text"
              value={character.Name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Class"
              type="text"
              value={character.Class.class}
              onChange={(e) => setClassNameChoice(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <InputBox
              name="Level"
              type="number"
              value={character.Class.level}
              onChange={(e) => setClassLevelChoice(parseInt(e.target.value))}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Background"
              type="text"
              value={character.Background}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Race"
              type="text"
              value={character.Race}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Alignment"
              type="text"
              value={character.Alignment}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Speed"
              type="number"
              value={character.Speed}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Armor_Class"
              type="number"
              value={character.ArmorClass}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Initiative"
              type="number"
              value={character.Initiative}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Max_Hitpoints"
              type="number"
              value={character.MaxHitpoints}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBox
              name="Hit_Dice"
              type="text"
              value={character.HitDice}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <StatBlock
              attributeName="Strength"
              boxValue={character.Strength}
              onBoxChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <StatBlock
              attributeName="Dexterity"
              boxValue={character.Dexterity}
              onBoxChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <StatBlock
              attributeName="Constitution"
              boxValue={character.Constitution}
              onBoxChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <StatBlock
              attributeName="Intelligence"
              boxValue={character.Intelligence}
              onBoxChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <StatBlock
              attributeName="Wisdom"
              boxValue={character.Wisdom}
              onBoxChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <StatBlock
              attributeName="Charisma"
              boxValue={character.Charisma}
              onBoxChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Character
        </button>
      </div>
    </>
  );
};
