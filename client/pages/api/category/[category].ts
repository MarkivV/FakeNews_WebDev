import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{category, page}} = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const newsGetCategory = await NewsPosts.find({category: category, published: true}).skip(Number(page)*10).limit(10)
                const lastFivePosts = await NewsPosts.find({published: true}, {image: 1, title: 1, _id: 1, createdAt: 1, category: 1, url: 1 })
                    .sort({ updatedAt: -1 })
                    .limit(5);

                const newsApi = {lastFivePosts, newsGetCategory}
                res.status(200).json(newsApi)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }
}


