import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ShobuBoard from "./shobu-board";
import { arrayToGame } from "~/utils/gamelogic";

export default function Game(props: { slug: string, playerId: string, playerRole: string }) {
    const { slug, playerId, playerRole } = props;

    const trpcContext = api.useUtils();
    const router = useRouter();

    const gameData = api.game.gameData.useQuery({ slug });

    api.game.gameDataSubscription.useSubscription({
        slug
    }, {
        onData: (message) => {
            console.log('new data from server', message);
            if (message.type === 'GameUpdated') {
                trpcContext.game.gameData.setData({ slug }, () => {
                    return {
                        board: message.board,
                        state: message.state,
                    };
                });
            } else if (message.type === 'RenewGame') {
                void router.push(`${message.newSlug}`);
            }
        },
    });

    if (!gameData.data)
        return null;

    return (
        <ShobuBoard key={slug} board={arrayToGame(gameData.data.board)} />
    );
}