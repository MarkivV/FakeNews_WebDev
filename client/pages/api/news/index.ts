import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    console.log(req.body)

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const newsGet = await NewsPosts.find({published: true})
                res.status(200).json(newsGet.reverse())
            }catch (e:any) {
                res.status(404).json(e)
            }
            break;
        case "POST":
            try {
                const newsCreate = await NewsPosts.create(req.body)
                res.status(201).json(newsCreate)
            }catch (e: any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

