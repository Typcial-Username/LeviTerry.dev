import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  success: boolean;
};

export default function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  console.log(body);

  if (!body.name || !body.email || !body.message) {
    return res.status(400).json({ message: 'Missing "name", "email", or "message"', success: false });
  }

  res.status(200).json({ success: true });
}
