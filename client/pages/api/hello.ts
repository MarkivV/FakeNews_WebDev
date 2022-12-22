import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

export default function getAllPosts(req: NextApiRequest, res: NextApiResponse) {

    res.status(200).json("https://6397ac3d86d04c76339b6c96.mockapi.io/news")
}