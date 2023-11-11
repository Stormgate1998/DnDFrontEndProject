import "../App.css";
import Navbar from "../components/NavBar";

import React, { useEffect, useState } from "react";
import { Character } from "../objects/Character";
import InputBox from "../components/inputBox";

export const CharacterMaker = () => {
  const [character, setCharacter] = useState<Character>({
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
    id: "",
    playerid: "",
    partyid: "",
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

  const handleSave = () => {
    // Save character to local storage
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      CurrentHitpoints: prevCharacter.MaxHitpoints,
    }));
    localStorage.setItem("character", JSON.stringify(character));
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
        <div className="btn btn-primary">test</div>
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
          name="Armor Class"
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
          name="Strength"
          type="number"
          value={character.Strength}
          onChange={handleChange}
        />
        <InputBox
          name="Dexterity"
          type="number"
          value={character.Dexterity}
          onChange={handleChange}
        />
        <InputBox
          name="Constitution"
          type="number"
          value={character.Constitution}
          onChange={handleChange}
        />
        <InputBox
          name="Intelligence"
          type="number"
          value={character.Intelligence}
          onChange={handleChange}
        />
        <InputBox
          name="Wisdom"
          type="number"
          value={character.Wisdom}
          onChange={handleChange}
        />
        <InputBox
          name="Charisma"
          type="number"
          value={character.Charisma}
          onChange={handleChange}
        />
        <InputBox
          name="Max Hitpoints"
          type="number"
          value={character.MaxHitpoints}
          onChange={handleChange}
        />
        <InputBox
          name="Hit Dice"
          type="text"
          value={character.HitDice}
          onChange={handleChange}
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

        <button onClick={handleSave}>Save Character</button>
      </div>
    </>
  );
};
