import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {News} from "../../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {
        query: { id },
    } = req;
    try{
        const {data} = await axios.get<News>(`https://6397ac3d86d04c76339b6c96.mockapi.io/news/${id}`);
        res.status(200).json(data)
    }catch (e){
        res.status(500).json(e);
    }
}