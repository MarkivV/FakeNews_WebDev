import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{category}} = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const newsGetCategory = await NewsPosts.find({category: category, published: true})
                res.status(200).json(newsGetCategory)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}


