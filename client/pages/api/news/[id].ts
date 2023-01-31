import axios from "axios";
import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";
import {News} from "../../../types/types";
import { User } from "../../../models/User";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{id}} = req

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const post = await NewsPosts.findById(id)
                if(post){
                    const creator = post.creator;
                    // @ts-ignore
                    const posts = await NewsPosts.find({ creator: { $in: [creator] } });
                    const postsUser = await User.findById(creator)
                    res.status(200).json({
                        post: post,
                        posts: posts.sort(function () {
                            return Math.random() - 0.5;
                        }),
                        userName: postsUser?.name
                    });
                }
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

// await NewsPosts.findOne({_id: id}, (err: any, post: News) => {
//     if (err) throw err;
//     if (post) {
//         const creator = post.creator;
//         // Get all posts with same creator
//         // @ts-ignore
//         NewsPosts.find({creator: {$in: [creator]}}).toArray((err, posts) => {
//             if (err) throw err;
//             console.log(posts);
//             res.status(200).json(posts)
//         });
//     }
// })


