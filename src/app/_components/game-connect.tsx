import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { createId as cuid } from '@paralleldrive/cuid2';
import Game from "./game";
import GameStatus from "./game-status";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem(key);
            // Check if the local storage already has any values,
            // otherwise initialize it with the passed initialValue
            const toSave = value ? JSON.parse(value) as T : initialValue;
            window.localStorage.setItem(key, JSON.stringify(toSave));
            return toSave;
        } catch (error) {
            console.log(error)
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            // If the passed value is a callback function,
            //  then call it with the existing state.
            const valueToStore = value instanceof Function ? value(state) as T : value
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
            setState(value)
        } catch (error) {
            console.log(error)
        }
    };

    return [state, setValue] as const;
};

export default function GameConnect(props: { slug: string }) {
  const { slug } = props;

  const registerPlayerMutation = api.game.registerPlayer.useMutation();

  const [playerRole, setPlayerRole] = useState<string | null>(null);
  const [playerId, _] = useLocalStorage<string>('shobu', cuid());

  useEffect(() => {
    void (async () => {
      console.log("making register request with id", playerId)
      const playerInfo = await registerPlayerMutation.mutateAsync({ slug, playerId });

      if (!playerInfo) {
        console.error("unable to register with the server :(");
        return;  // something went wrong
      }

      console.log("registered as", playerInfo.role);
      setPlayerRole(playerInfo.role);
    })();
  }, []);

  // TODO: the game doesn't exist screen
  if (!playerRole)
    return <>server se pokakal :(</>;

  return (
    <Game key={slug} slug={slug} playerId={playerId} playerRole={playerRole} />
  );
}