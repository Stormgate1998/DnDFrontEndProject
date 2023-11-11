import React, { useEffect, useState } from 'react';
import '../App.css';
import Navbar from '../components/NavBar';
import { Character } from '../objects/Character';

interface ViewerProps {}

export const CharacterViewer: React.FC<ViewerProps> = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Retrieve character data from local storage
    const storedCharacter = localStorage.getItem('character');

    if (storedCharacter) {
      const parsedCharacter: Character = JSON.parse(storedCharacter);
      setCharacter(parsedCharacter);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {character ? (
          <div>
  <h1>{character.Name}</h1>
  <p>Class: {character.Class.class}</p>
  <p>Level: {character.Class.level}</p>
  <p>Background: {character.Background}</p>
  <p>Race: {character.Race}</p>
  <p>Alignment: {character.Alignment}</p>
  <p>Strength: {character.Strength}</p>
  <p>Dexterity: {character.Dexterity}</p>
  <p>Constitution: {character.Constitution}</p>
  <p>Intelligence: {character.Intelligence}</p>
  <p>Wisdom: {character.Wisdom}</p>
  <p>Charisma: {character.Charisma}</p>
  <p>Max Hitpoints: {character.MaxHitpoints}</p>
  <p>Current Hitpoints: {character.CurrentHitpoints}</p>
  <p>Temporary Hitpoints: {character.TemporaryHitpoints}</p>
  <p>Hit Dice: {character.HitDice}</p>
  <p>Death Saves Successes: {character.DeathSaves.successes}</p>
  <p>Death Saves Failures: {character.DeathSaves.failures}</p>
  <p>Speed: {character.Speed}</p>
  <p>Armor Class: {character.ArmorClass}</p>
  <p>Initiative: {character.Initiative}</p>
  <p>
    Traits: {character.Traits.length > 0 ? character.Traits.join(', ') : 'None'}
  </p>
</div>
        ) : (
          <p>No character data found.</p>
        )}
      </header>
    </div>
  );
};
