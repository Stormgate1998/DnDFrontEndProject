import { QueryCache, QueryClient, useMutation, useQuery} from '@tanstack/react-query';
import { CharacterService } from './characterApiService';
import toast from 'react-hot-toast';
import { Character } from '../objects/Character';


export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) =>{
            toast.error('Something went wrong:'+ {error})
        }
    })
})


export const useGetCharactersQuery = (playerId: string) => useQuery({
  queryKey: ["characters", playerId],
  queryFn: async () => {
   return await CharacterService.getCharacters(playerId);
  },
  refetchInterval: 30000,
    
});


export const useAddCharacters = () => {
    return useMutation({
        mutationFn: async (newCharacter: Character) => {
            return await CharacterService.addCharacter(newCharacter)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["characters"])
        }
    })
}

export const useEditCharacters = (playerId: string) => {
    return useMutation({
        mutationFn: async (newCharacter: Character) => {
            return await CharacterService.updateCharacter(newCharacter)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["characters", playerId])
        }
    })
}

export const useDeleteCharacters = () => {
    return useMutation({
        mutationFn: async (newCharacter: Character) => {
            return await CharacterService.deleteCharacter(newCharacter)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["characters"])
        }
    })
}