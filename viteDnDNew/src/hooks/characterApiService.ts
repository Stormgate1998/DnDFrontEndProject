import axios from "axios";
import { Character } from "../objects/Character";
import { Party } from "../objects/Party";

const baseURL = "/api/store?key=";

export const CharacterService = {
  async getCharacters(playerId: string): Promise<Character[]> {
    try {
      const url = baseURL + playerId;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("Characters not found for player ID:", playerId);
        return [];
      }

      console.error("Error fetching Characters:", error);
      throw error;
    }
  },
  async getManyCharacters(playerIds: string[]): Promise<Character[][]> {
    try {
      const characterPromises = playerIds.map((playerId) =>
        this.getCharacters(playerId)
      );
      const charactersArrays = await Promise.all(characterPromises);
      return charactersArrays;
    } catch (error) {
      console.error("Error fetching Characters for multiple players:", error);
      throw error;
    }
  },
  async addCharacter(Character: Character) {
    if (Character.Id != "" && Character.PlayerId !== "") {
      try {
        // Fetch existing Characters
        const existingCharacters = await this.getCharacters(Character.PlayerId);
        const newCharacters =
          existingCharacters.length > 0
            ? existingCharacters.concat(Character)
            : [Character];

        // Make a POST request with the updated Characters
        console.log(newCharacters);
        const response = await axios.post(
          baseURL + newCharacters[0].PlayerId,
          newCharacters
        );

        // Handle the response as needed
        console.log("Response from POST:", response.data);
      } catch (error) {
        console.error("Error adding Character:", error);
        throw error;
      }
    } else {
      console.log("empty id, did not submit");
    }
  },
  async updateCharacter(Character: Character) {
    try {
      const existingCharacters =
        (await this.getCharacters(Character.PlayerId)) ?? [];

      // Find the index of the Character to be updated
      const CharacterIndex = existingCharacters.findIndex(
        (c) => c.Id === Character.Id
      );

      if (CharacterIndex !== -1) {
        // Replace the existing Character with the updated Character
        existingCharacters[CharacterIndex] = Character;

        // Delete existing Characters and add the updated Characters
        await this.deleteCharacters(Character.PlayerId);
        await this.addCharacters(existingCharacters);
      } else {
        console.error("Character not found for update.");
      }
    } catch (error) {
      console.error("Error updating Character:", error);
      throw error;
    }
  },
  async deleteCharacters(id: string) {
    try {
      const url = baseURL + id;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error("Error deleting Character:", error);
      throw error;
    }
  },
  async addCharacters(Characters: Character[]) {
    try {
      const response = await axios.post(
        baseURL + Characters[0].PlayerId,
        Characters
      );

      // Handle the response as needed
      console.log("Response from POST:", response.data);
    } catch (error) {
      console.error("Error adding Character:", error);
      throw error;
    }
  },
  async deleteCharacter(Character: Character) {
    const existingCharacters =
      (await this.getCharacters(Character.PlayerId)) ?? [];
    const deletekey = existingCharacters[0].PlayerId;
    console.log(deletekey);
    this.deleteCharacters(existingCharacters[0].PlayerId);
    const newList = existingCharacters.filter((c) => c.Id !== Character.Id);
    console.log(newList);
    this.addCharacters(newList);
  },

  async addParty(party: Party) {
    try {
      //currently erases existing parties
      const list: Party[] = await this.getParties();
      console.log(list);
      const newParties = list.length > 0 ? list.concat(party) : [party];
      console.log(newParties);
      const response = await axios.post(baseURL + "parties", newParties);

      return response;
    } catch (error) {
      const newParty = [party];
      const response = await axios.post(baseURL + "parties", newParty);
      return response;
    }
  },
  async getParties(): Promise<Party[]> {
    const url = baseURL + "parties";
    const response = await axios.get(url);
    return response.data;
  },
  async updateParty(updatedParty: Party) {
    try {
      // Get the list of parties
      const response = await axios.get(baseURL + "parties");
      const partyList: Party[] = response.data;

      // Check if partyList is an array
      if (!Array.isArray(partyList)) {
        console.error("Invalid response format. Expected an array.");
        return;
      }

      // Find the index of the party with the provided gmId
      let partyIndex = -1;
      for (let i = 0; i < partyList.length; i++) {
        if (partyList[i].id === updatedParty.id) {
          partyIndex = i;
          break;
        }
      }

      if (partyIndex === -1) {
        // Party with provided gmId not found
        console.error("Party not found for id:", updatedParty.id);
        return;
      }

      // Update the party at the found index with the new party
      partyList[partyIndex] = updatedParty;

      // Update the parties in the database
      const postResponse = await axios.post(baseURL + "parties", partyList);

      // Handle the response as needed
      console.log("Response from PUT:", postResponse.data);
    } catch (error) {
      console.error("Error updating Party:", error);
      throw error;
    }
  },
  async getDmParties(GmId: string): Promise<Party[]> {
    const list = await this.getParties();
    if (list.length > 0) {
      const newList = list.filter((p) => p.gmId === GmId);
      return newList;
    } else {
      return [];
    }
  },

  async deleteParty(party: Party) {
    const existingParties = (await this.getParties()) ?? [];
    const newList = existingParties.filter((p) => p.id !== party.id);
    await axios.delete(baseURL + "parties");
    await axios.post(baseURL + "parties", newList);
  },
};
