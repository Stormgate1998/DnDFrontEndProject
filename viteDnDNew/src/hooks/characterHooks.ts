import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { CharacterService } from "./characterApiService";
import { Character } from "../objects/Character";
import { Party } from "../objects/Party";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    
  }),
});

export const useGetCharactersQuery = (playerId: string) =>
  useQuery({
    queryKey: ["characters", playerId],
    queryFn: async () => {
      return await CharacterService.getCharacters(playerId);
    },
    refetchInterval: 30000,
  });

export const useGetCharactersForManyPlayersQuery = (playerIDs: string[]) =>
  useQuery({
    queryKey: ["characters", { playerIDs }],
    queryFn: async () => {
      console.log("inputs: " + playerIDs);
      const input = await CharacterService.getManyCharacters(playerIDs);

      return input;
    },
  });

export const useAddCharacters = () => {
  return useMutation({
    mutationFn: async (newCharacter: Character) => {
      return await CharacterService.addCharacter(newCharacter);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};

export const useEditCharacters = () => {
  return useMutation({
    mutationFn: async (newCharacter: Character) => {
      return await CharacterService.updateCharacter(newCharacter);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
    onError: () => {
      console.log("error on editing character");
    },
  });
};

export const useDeleteCharacters = () => {
  return useMutation({
    mutationFn: async (newCharacter: Character) => {
      return await CharacterService.deleteCharacter(newCharacter);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};

export const useAddPartyQuery = () => {
  return useMutation({
    mutationFn: async (newParty: Party) => {
      return await CharacterService.addParty(newParty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
  });
};

export const useGetPartiesQuery = () =>
  useQuery({
    queryKey: ["parties"],
    queryFn: async () => {
      return await CharacterService.getParties();
    },
  });

export const useUpdatePartyMutation = () => {
  return useMutation({
    mutationFn: async (updatedParty: Party) => {
      return await CharacterService.updateParty(updatedParty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
  });
};
export const useGetUserGmPartiesQuery = (gmId: string) =>
  useQuery({
    queryKey: ["parties", gmId], // Include gmId in the queryKey
    queryFn: async () => {
      if (!gmId) {
        // If gmId is not available, return an empty result or handle it accordingly
        return [];
      }
      return await CharacterService.getDmParties(gmId);
    },
    refetchInterval: 30000,
  });

export const useDeleteParty = (gmId: string) => {
  return useMutation({
    mutationFn: async (deletedParty: Party) => {
      return await CharacterService.deleteParty(deletedParty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties", gmId] });
    },
  });
};
