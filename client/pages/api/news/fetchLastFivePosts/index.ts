import dbConnect from "../../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    await dbConnect()

    switch (method) {
        case "GET":
            try {
                // const lastFivePosts = await NewsPosts.find({ published: true }).sort({ createdAt: -1 }).limit(5)
                const lastFivePosts = await NewsPosts.find({}, { image: 1})
                    .sort({ createdAt: -1 })
                    .limit(5);

                res.status(200).json(lastFivePosts)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

