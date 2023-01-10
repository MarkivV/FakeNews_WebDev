import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

export default function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({name: "John"})
}