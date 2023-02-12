import { Comment } from './../../../types/types.d';
import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import Comments from "../../../models/Comments";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query: {comment}} = req
    console.log(req.body)

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const commentsGet = await Comments.find({postId: comment})
                console.log(commentsGet);                
                res.status(200).json(commentsGet.reverse())
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

