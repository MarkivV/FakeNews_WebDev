import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import Comments from "../../../models/Comments";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    console.log(req.body)

    await dbConnect()

    switch (method) {
        case "POST":
            try {
                const commentsPost = await Comments.create(req.body)
                res.status(201).json(commentsPost)
            }catch (e: any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

