import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

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
    case "GET":
      try {
        const userGet = await User.findById(id);
        res.status(201).json(userGet);
      } catch (e: any) {
        res.status(500).json(e);
      }
      break;
    case "UPDATE":
      try {
        const userUpdate = await User.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              image: req.body.image,
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
