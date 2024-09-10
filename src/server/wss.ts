import { applyWSSHandler, CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import ws, { WebSocketServer } from 'ws';
import { appRouter } from './api/root';
import { createTRPCContext } from './api/trpc';

const wss = new WebSocketServer({
    port: 3001,
});

const createContext = async (opts: CreateWSSContextFnOptions) => {
    return createTRPCContext({
        headers: opts.req.headers as unknown as Headers,  // lil TS hack
    });
};

const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});

console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});
