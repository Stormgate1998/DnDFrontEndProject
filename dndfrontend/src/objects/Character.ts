export interface Character {
    id: string;
    playerid: string;
    partyid: string;
    
}export interface Character {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
  MaxHitpoints: number;
  CurrentHitpoints: number;
  TemporaryHitpoints: number;
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
  SkillModifiers: {
    [skill: string]: number;
  };
  Speed: number;
  ArmorClass: number;
  Initiative: number;
  Traits: string[];
}