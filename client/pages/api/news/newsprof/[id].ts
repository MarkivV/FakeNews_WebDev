import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../../models/NewsPosts";
import dbConnect from "../../../../utils/dbConnect";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{id}} = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const posts = await NewsPosts.find({creator: id})
                res.status(201).json(posts)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

