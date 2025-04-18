import { NextApiRequest, NextApiResponse } from 'next'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ success: true }, {
      headers: {
        'Set-Cookie': 'admin-auth=true; HttpOnly; Path=/; Max-Age=86400'
      }
    })
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' })
}

