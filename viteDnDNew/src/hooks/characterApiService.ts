import axios from "axios";
import { Character } from "../objects/Character";

const baseURL = '/api/store?key=';

export const CharacterService = {
  async getCharacters(weaponId: string): Promise<Character[]> {
    try {
      const url = baseURL + weaponId;
      console.log(url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Check if the error is a 404 error
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Characters not found for weaponId:', weaponId);
        return []; // Return an empty array in case of a 404 error
      }

      console.error('Error fetching Characters:', error);
      throw error;
    }
  },
  async addCharacter(Character: Character) {
    if (Character.Id != "" && Character.PlayerId !== '') {
      try {
        // Fetch existing Characters
        const existingCharacters = (await this.getCharacters(Character.PlayerId)) || [];
        const newCharacters = existingCharacters.length > 0
          ? existingCharacters.concat(Character)
          : [Character];

        // Make a POST request with the updated Characters
        console.log(newCharacters);
        const response = await axios.post(baseURL+newCharacters[0].PlayerId, newCharacters);

        // Handle the response as needed
        console.log('Response from POST:', response.data);
      } catch (error) {
        console.error('Error adding Character:', error);
        throw error;
      }
    } else {
      console.log("empty id, did not submit");
    }
  },
  async updateCharacter(Character: Character) {
    try {
      const existingCharacters = await this.getCharacters(Character.PlayerId) ?? [];

      // Find the index of the Character to be updated
      const CharacterIndex = existingCharacters.findIndex((c) => c.Id === Character.Id);

      if (CharacterIndex !== -1) {
        // Replace the existing Character with the updated Character
        existingCharacters[CharacterIndex] = Character;

        // Delete existing Characters and add the updated Characters
        await this.deleteCharacters(Character.PlayerId);
        await this.addCharacters(existingCharacters);
      } else {
        console.error('Character not found for update.');
      }
    } catch (error) {
      console.error('Error updating Character:', error);
      throw error;
    }
  },
  async deleteCharacters(id: string) {
    try {
      const url = baseURL + id;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error deleting Character:', error);
      throw error;
    }
  },
  async addCharacters(Characters: Character[]) {

    try {
      const response = await axios.post(baseURL+ Characters[0].PlayerId, Characters);

      // Handle the response as needed
      console.log('Response from POST:', response.data);
    } catch (error) {
      console.error('Error adding Character:', error);
      throw error;
    }

  },
  async deleteCharacter(Character: Character) {
    const existingCharacters = await this.getCharacters(Character.PlayerId) ?? [];
    const deletekey = existingCharacters[0].PlayerId;
    console.log(deletekey)
    this.deleteCharacters(existingCharacters[0].PlayerId);
    const newList = existingCharacters.filter((c) => c.Id !== Character.Id);
    console.log(newList)
    this.addCharacters(newList);
  }
};