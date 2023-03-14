// src/functions/getClientAddress.js

import { getClientAddress } from '@sveltejs/kit/node';

export async function handler(event, _context) {
  const clientAddress = await getClientAddress(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ clientAddress }),
  };
}