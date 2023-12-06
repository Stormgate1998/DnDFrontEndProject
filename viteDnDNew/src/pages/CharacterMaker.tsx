import "../App.css";

import React, { useEffect, useState } from "react";
import { Character } from "../objects/Character";
import InputBox from "../components/InputBox";
import { useAddCharacters } from "../hooks/characterHooks";
import { useAuth } from "react-oidc-context";
import StatBlock from "../components/StatBlock";
import InputBoxWithType from "../components/InputBoxWithType";
import toast, { Toaster } from "react-hot-toast";

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
    await addCharacter
      .mutateAsync(character)
      .then(() => toast.success("Added Character"));
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
      <Toaster />
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
            Class:
            <select
              name="Class"
              value={character.Class.class}
              onChange={(e) => setClassNameChoice(e.target.value)}
            >
              <option value="Artificer">Artificer</option>
              <option value="Barbarian">Barbarian</option>
              <option value="Bard">Bard</option>
              <option value="Cleric">Cleric</option>
              <option value="Druid">Druid</option>
              <option value="Fighter">Fighter</option>
              <option value="Monk">Monk</option>
              <option value="Paladin">Paladin</option>
              <option value="Ranger">Ranger</option>
              <option value="Rogue">Rogue</option>
              <option value="Sorcerer">Sorcerer</option>
              <option value="Warlock">Warlock</option>
              <option value="Wizard">Wizard</option>
            </select>
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
            Race
            <select
              className="form-control"
              name="Race"
              value={character.Race}
              onChange={handleChange}
            >
              <option value="Dragonborn">Dragonborn</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Elf">Elf</option>
              <option value="Gnome">Gnome</option>
              <option value="Half-Elf">Half-Elf</option>
              <option value="Halfling">Halfling</option>
              <option value="Half-Orc">Half-Orc</option>
              <option value="Human">Human</option>
              <option value="Tiefling">Tiefling</option>
            </select>
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
            <InputBoxWithType<Character>
              name="ArmorClass"
              type="number"
              value={character.ArmorClass}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBoxWithType<Character>
              name="Initiative"
              type="number"
              value={character.Initiative}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBoxWithType<Character>
              name="MaxHitpoints"
              type="number"
              value={character.MaxHitpoints}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputBoxWithType<Character>
              name="HitDice"
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
