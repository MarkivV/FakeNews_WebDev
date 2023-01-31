import dbConnect from "../../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;
  console.log(req.body);

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const userUpdate = await User.updateOne(
          { _id: id },
          {
            $set: {
                role: req.body.role
            },
          },
          {
            $currentDate: {
              lastUpdated: true,
            },
          }
        );
        res.status(201).json(userUpdate);
      } catch (e: any) {
        res.status(500).json(e);
      }
      break;
    default:
      break;
  }
}
