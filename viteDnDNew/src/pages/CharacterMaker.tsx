import "../App.css";
import Navbar from "../components/NavBar";

import React, { useEffect, useState } from "react";
import { Character } from "../objects/Character";
import RandomInputBox from "../components/RandomInputBox";
import InputBox from "../components/InputBox";
import { useAddCharacters } from "../hooks/characterHooks";
import { PartyMaker } from "./PartyMaker";

export const CharacterMaker = () => {
  const addCharacter = useAddCharacters();
  const [character, setCharacter] = useState<Character>({
    PlayerId: "testId",
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
    Id: Date.now.toString(),
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
    localStorage.setItem("character", JSON.stringify(character));
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
      <Navbar />
      <div className="container">
        <PartyMaker />
        <InputBox
          name="Name"
          type="text"
          value={character.Name}
          onChange={handleChange}
        />
        <InputBox
          name="Class"
          type="text"
          value={character.Class.class}
          onChange={(e) => setClassNameChoice(e.target.value)}
        />
        <InputBox
          name="Level"
          type="number"
          value={character.Class.level}
          onChange={(e) => setClassLevelChoice(parseInt(e.target.value))}
        />
        <InputBox
          name="Background"
          type="text"
          value={character.Background}
          onChange={handleChange}
        />
        <InputBox
          name="Race"
          type="text"
          value={character.Race}
          onChange={handleChange}
        />
        <InputBox
          name="Alignment"
          type="text"
          value={character.Alignment}
          onChange={handleChange}
        />

        <InputBox
          name="Speed"
          type="number"
          value={character.Speed}
          onChange={handleChange}
        />

        <InputBox
          name="Armor_Class"
          type="number"
          value={character.ArmorClass}
          onChange={handleChange}
        />

        <InputBox
          name="Initiative"
          type="number"
          value={character.Initiative}
          onChange={handleChange}
        />
        <InputBox
          name="Max_Hitpoints"
          type="number"
          value={character.MaxHitpoints}
          onChange={handleChange}
        />

        <InputBox
          name="Hit_Dice"
          type="text"
          value={character.HitDice}
          onChange={handleChange}
        />
        <RandomInputBox
          maxNumber={6}
          numberOfRolls={4}
          name="Strength"
          boxValue={character.Strength}
          onBoxChange={handleChange}
        />
        <RandomInputBox
          maxNumber={6}
          numberOfRolls={4}
          name="Dexterity"
          boxValue={character.Dexterity}
          onBoxChange={handleChange}
        />
        <RandomInputBox
          maxNumber={6}
          numberOfRolls={4}
          name="Constitution"
          boxValue={character.Constitution}
          onBoxChange={handleChange}
        />
        <RandomInputBox
          maxNumber={6}
          numberOfRolls={4}
          name="Intelligence"
          boxValue={character.Intelligence}
          onBoxChange={handleChange}
        />
        <RandomInputBox
          maxNumber={6}
          numberOfRolls={4}
          name="Wisdom"
          boxValue={character.Wisdom}
          onBoxChange={handleChange}
        />
        <RandomInputBox
          maxNumber={6}
          numberOfRolls={4}
          name="Charisma"
          boxValue={character.Charisma}
          onBoxChange={handleChange}
        />

        {/* 
  <label>Traits:</label>
  <input
    type="text"
    name="Traits"
    value={character.Traits.join(', ')}
    onChange={(e) =>
      handleChange({
        target: { name: 'Traits', value: e.target.value.split(',').map((trait) => trait.trim()) },
      })
    }
  /> */}

        <button className="btn btn-primary" onClick={handleSave}>
          Save Character
        </button>
      </div>
    </>
  );
};
