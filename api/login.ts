/// <reference types="node" />

// File: api/login.ts (or api/login.js)

// NOTE: Use 'import { VercelRequest, VercelResponse } from "@vercel/node";'
// if using a dedicated Vercel package, otherwise a standard API approach works.

export default function handler(req: any, res: any) {
  // 1. Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method Not Allowed' });
  }

  // 2. Safely read secrets from Vercel's server environment
  const VALID_USERNAME = process.env.CMS_USERNAME;
  const VALID_PASSWORD = process.env.CMS_PASSWORD;

  // 3. Get credentials from the client request body
  const { username, password } = req.body;

  // 4. Perform the secure check
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // 5. Successful login
    // In a real app, you would generate a JWT token here.
    // For this simple example, we'll just send a success flag.
    return res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    // 6. Failed login
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
}