import axios from "axios";
import dbConnect from "../../../utils/dbConnect";
import {News} from "../../../types/types";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{id}} = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const newsGetById = await NewsPosts.findById(id)
                res.status(200).json(newsGetById)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}


