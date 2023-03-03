import axios from "axios";
import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../models/NewsPosts";
import {News} from "../../../types/types";
import { User } from "../../../models/User";
import  Comments  from "../../../models/Comments";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method, query:{id}} = req
    await dbConnect()
    switch (method) {
        case "GET":
            try {
                const post = await NewsPosts.findOne({url: id})
                if(post){
                    const creator = post.creator;
                    const posts = await NewsPosts.find({ creator: { $in: [creator] } }).limit(3);
                    const postsUser = await User.findById(creator)
                    res.status(200).json({
                        post: post,
                        posts: posts.sort(function () {
                            return Math.random() - 0.5;
                        }),
                        userName: postsUser?.name,
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

