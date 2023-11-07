import logo from '../logo.svg';
import '../App.css';
import Navbar from '../components/NavBar';

import React, { useEffect, useState } from 'react';
import { Character } from '../objects/Character';


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
    HitDice: '',
    DeathSaves: { successes: 0, failures: 0 },
    Name: '',
    Background: '',
    Alignment: '',
    Class: { class: '', level: 0 },
    Race: '',
    SkillModifiers: {},
    Speed: 0,
    ArmorClass: 0,
    Initiative: 0,
    Traits: [],
    id: '',
    playerid: '',
    partyid: "",
  });
  const [classNameChoice, setClassNameChoice] = useState("")
  const [classLevelChoice, setClassLevelChoice] = useState(0)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({ ...prevCharacter, [name]: value }));
  };

  const handleSave = () => {
    // Save character to local storage
    localStorage.setItem('character', JSON.stringify(character));
    // Call the parent onSave function
  };

  useEffect(() => {
     setCharacter((prevCharacter) => ({
      ...prevCharacter,
      Class: { ...prevCharacter.Class, class: classNameChoice},
    }))
  }, [classNameChoice])

  useEffect(() => {
     setCharacter((prevCharacter) => ({
      ...prevCharacter,
      Class: { ...prevCharacter.Class, level: classLevelChoice},
    }))
  }, [classLevelChoice])



  return (
    <>
    <Navbar/>
      <div>
  <label>Name:</label>
  <input
    type="text"
    name="Name"
    value={character.Name}
    onChange={handleChange}
  />

  <label>Class:</label>
<input
  type="text"
  name="Class"
  value={character.Class.class}
  onChange={(e) =>
    setClassNameChoice(e.target.value)
  }
/>


  <label>Level:</label>
  <input
    type="number"
    name="Level"
    value={character.Class.level}
    onChange={(e) =>
      setClassLevelChoice(parseInt(e.target.value))
    }
  />
  <label>Background:</label>
  <input
    type="text"
    name="Background"
    value={character.Background}
    onChange={handleChange}
  />

  <label>Race:</label>
  <input
    type="text"
    name="Race"
    value={character.Race}
    onChange={handleChange}
  />

  <label>Alignment:</label>
  <input
    type="text"
    name="Alignment"
    value={character.Alignment}
    onChange={handleChange}
  />

  <label>Speed:</label>
  <input
    type="number"
    name="Speed"
    value={character.Speed}
    onChange={handleChange}
  />

  <label>Armor Class:</label>
  <input
    type="number"
    name="ArmorClass"
    value={character.ArmorClass}
    onChange={handleChange}
  />

  <label>Initiative:</label>
  <input
    type="number"
    name="Initiative"
    value={character.Initiative}
    onChange={handleChange}
  />
   <label>Strength:</label>
  <input
    type="number"
    name="Strength"
    value={character.Strength}
    onChange={handleChange}
  />

  <label>Dexterity:</label>
  <input
    type="number"
    name="Dexterity"
    value={character.Dexterity}
    onChange={handleChange}
  />

  <label>Constitution:</label>
  <input
    type="number"
    name="Constitution"
    value={character.Constitution}
    onChange={handleChange}
  />

  <label>Intelligence:</label>
  <input
    type="number"
    name="Intelligence"
    value={character.Intelligence}
    onChange={handleChange}
  />

  <label>Wisdom:</label>
  <input
    type="number"
    name="Wisdom"
    value={character.Wisdom}
    onChange={handleChange}
  />

  <label>Charisma:</label>
  <input
    type="number"
    name="Charisma"
    value={character.Charisma}
    onChange={handleChange}
  />

  <label>Max Hitpoints:</label>
  <input
    type="number"
    name="MaxHitpoints"
    value={character.MaxHitpoints}
    onChange={handleChange}
  />

  <label>Current Hitpoints:</label>
  <input
    type="number"
    name="CurrentHitpoints"
    value={character.CurrentHitpoints}
    onChange={handleChange}
  />

  <label>Temporary Hitpoints:</label>
  <input
    type="number"
    name="TemporaryHitpoints"
    value={character.TemporaryHitpoints}
    onChange={handleChange}
  />

  <label>Hit Dice:</label>
  <input
    type="text"
    name="HitDice"
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
