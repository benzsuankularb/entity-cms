import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { EntityEndpointRouter } from '../../backend/rpc/endpoint-router';

const client = createTRPCProxyClient<EntityEndpointRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/trpc',
      }),
    ],
});

client.suggestCommandInput.query({
    entityId: '',
    endpoint: '',
    id: '1',
    payloadId: 'id',
    payloads: [],
});