import dbConnect from "../../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import NewsPosts from "../../../../models/NewsPosts";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    await dbConnect()

    switch (method) {
        case "GET":
            try {
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
                                                // _id: '$$post._id',
                                                // title: '$$post.title',
                                                image: '$$post.image',
                                                // createdAt: '$$post.createdAt',
                                                // category: '$_id'
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

                res.status(200).json(postsByCategory)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;

        default:
            break;
    }

}

