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
                // const lastFivePosts = await NewsPosts.find({ published: true }).sort({ createdAt: -1 }).limit(5)
                const lastFivePosts = await NewsPosts.find({published: true}, {image: 1, title: 1, _id: 1, createdAt: 1, category: 1 })
                    .sort({ createdAt: -1 })
                    .limit(5);
                // const topThreeRatedPosts = await NewsPosts.find({ rating: { $gte: 0, $lte: 9 }, published: true })
                //     .sort({ rating: -1 })
                //     .limit(3);
                const topThreeRatedPosts = await NewsPosts.find(
                    { rating: { $gte: 0, $lte: 9 }, published: true },
                    { image: 1,title: 1, _id: 1, createdAt: 1, category: 1, description: 1 }
                )
                    .sort({ rating: -1 })
                    .limit(3);
                // const postsByCategory = await NewsPosts.aggregate([
                //     { $match: { published: true } },
                //     {
                //         $group: {
                //             _id: '$category',
                //             posts: { $push: '$$ROOT' },
                //             count: { $sum: 1 }
                //         }
                //     },
                //     {
                //         $project: {
                //             _id: 0,
                //             category: '$_id',
                //             posts: { $slice: ['$posts', 10] },
                //             count: 1
                //         }
                //     },
                //     { $unwind: '$posts' },
                //     { $replaceRoot: { newRoot: '$posts' } }
                // ]);

                const postsByCategory = await NewsPosts.aggregate([
                    { $match: { published: true } },
                    {
                        $group: {
                            _id: '$category',
                            posts: { $push: '$$ROOT' },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            category: '$_id',
                            posts: {
                                $slice: [
                                    {
                                        $map: {
                                            input: '$posts',
                                            as: 'post',
                                            in: {
                                                _id: '$$post._id',
                                                title: '$$post.title',
                                                image: '$$post.image',
                                                createdAt: '$$post.createdAt',
                                                category: '$_id'
                                            }
                                        }
                                    },
                                    10
                                ]
                            },
                            count: 1
                        }
                    },
                    { $unwind: '$posts' },
                    { $replaceRoot: { newRoot: '$posts' } }
                ]);
                const news = {
                    lastFivePosts,
                    topThreeRatedPosts,
                    postsByCategory
                }
                // const newsGet = await NewsPosts.find({published: true}).limit(10)
                // res.status(200).json(newsGet.reverse())
                res.status(200).json(news)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        case "POST":
            try {
                const newsCreate = await NewsPosts.create(req.body)
                console.log(req.body)
                res.status(201).json(newsCreate)
            }catch (e: any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

