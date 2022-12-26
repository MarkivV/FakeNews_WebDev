import axios from "axios";
import dbConnect from "../../../utils/mongo";
import {News} from "../../../types";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{category}} = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const newsGetCategory = await NewsPosts.find({category: category})
                res.status(200).json(newsGetCategory)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        // case "POST":
        //     try {
        //         const newsCreate = await NewsPosts.create(req.body)
        //         res.status(201).json(newsCreate)
        //     }catch (e: any) {
        //         res.status(500).json(e)
        //     }
        //     break;
        // case "PUT":
        //     try {
        //         const newsCreate = await NewsPosts.update(req.body)
        //         res.status(201).json(newsCreate)
        //     }catch (e: any) {
        //         res.status(500).json(e)
        //     }
        //     break;
        // case "DELETE":
        //     try {
        //         const pizzaCreate = await NewsPosts.delete(req.body)
        //         res.status(201).json(pizzaCreate)
        //     }catch (e: any) {
        //         res.status(500).json(e)
        //     }
        //     break;
        default:
            break;
    }

}

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     const {
//         query: { id },
//     } = req;
//     try{
//         const {data} = await axios.get<News>(`https://6397ac3d86d04c76339b6c96.mockapi.io/news/${id}`);
//         res.status(200).json(data)
//     }catch (e){
//         res.status(500).json(e);
//     }
// }

