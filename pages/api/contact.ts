import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

export default function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  if (!body.name || !body.email || !body.message) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true });
}
