import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {News} from "../../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const {data} = await axios.get<News[]>(`https://6397ac3d86d04c76339b6c96.mockapi.io/news`);
        res.status(200).json(data)
    }catch (e){
        res.status(500).json(e);
    }

}