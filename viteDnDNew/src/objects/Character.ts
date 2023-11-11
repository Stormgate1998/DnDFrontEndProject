export interface Character {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
  MaxHitpoints: number;
  CurrentHitpoints: number;
  TemporaryHitpoints: number;
  Acrobatics: number;
  Animal_Handling: number;
  Arcana: number;
  Athletics: number;
  Deception: number;
  History: number;
  Insight: number;
  Intimidation: number;
  Investigation: number;
  Medicine: number;
  Nature: number;
  Perception: number;
  Performance: number;
  Persuasion: number;
  Religion: number;
  Sleight_of_hand: number; 
  Stealth: number;
  Survival: number;
  HitDice: string;
  DeathSaves: {
    successes: number;
    failures: number;
  };
  Name: string;
  Background: string;
  Alignment: string;
  Class: {
    class: string;
    level: number;
  };
  Race: string; // Replace with actual Race type if available
  Speed: number;
  ArmorClass: number;
  Initiative: number;
  Traits: string[];
  PlayerId: string;
  Id: string;
  PartyId: string;
}