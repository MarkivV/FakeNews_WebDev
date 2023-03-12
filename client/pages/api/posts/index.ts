import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse, PageConfig} from "next";
import NewsPosts from "../../../models/NewsPosts";
import {method1} from "../../../utils/upload";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    await dbConnect()



    switch (method) {
        case "GET":
            try {
                const getPosts = await NewsPosts.find({published: true}, {url: 1, updatedAt: 1})
                res.status(200).json(getPosts)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;

        default:
            break;
    }

}

