import dbConnect from "../../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    await dbConnect()

    switch (method) {
        case "GET":
            try {

                const topThreeRatedPosts = await NewsPosts.find(
                    { rating: { $gte: 0, $lte: 9 }, published: true },
                    { image: 1, title: 1, _id: 1, createdAt: 1, category: 1, description: 1 }
                )
                    .sort({ rating: -1 })
                    .limit(3);


                res.status(200).json(topThreeRatedPosts)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

