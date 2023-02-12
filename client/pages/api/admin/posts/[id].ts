import dbConnect from "../../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import NewsPosts from "../../../../models/NewsPosts";
import { User } from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;
  console.log(req.body);

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const post = await NewsPosts.findById(id);
        if (post) {
          const creatorID = post.creator;
          const posts = await User.findById(creatorID);
          res.status(200).json({
            post: post,
            userName: posts?.name,
          });
        }
      } catch (e: any) {
        res.status(500).json(e);
      }
      break;
    case "PUT":
      try {
        const newsUpdate = await NewsPosts.updateOne(
          { _id: id },
          {
            $set: {
              title: req.body.title,
              description: req.body.description,
              image: req.body.image,
              tags: req.body.tags,
              published: req.body.published,
              category: req.body.category,
            },
          },
          {
            $currentDate: {
              lastUpdated: true,
            },
          }
        );
        res.status(201).json(newsUpdate);
      } catch (e: any) {
        res.status(500).json(e);
      }
      break;
    case "DELETE":
      try {
        const newsDeleted = await NewsPosts.deleteOne({ _id: id });
        res.status(201).json(newsDeleted);
      } catch (e: any) {
        res.status(500).json(e);
      }
      break;
    case "POST":
      try {
        const newsPublished = await NewsPosts.findOneAndUpdate(
          { _id: id },
          { $set: { 
            published: req.body.published,
            rating: req.body.rating 
        } }
        );
        res.status(201).json(newsPublished);
      } catch (e: any) {
        res.status(500).json(e);
      }
      break;
    default:
      break;
  }
}
