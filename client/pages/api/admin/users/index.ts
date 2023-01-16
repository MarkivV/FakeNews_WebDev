import dbConnect from "../../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../../models/User";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const {method} = req
    console.log(req.body)

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                const usersGet = await User.find()
                res.status(200).json(usersGet)
            }catch (e:any) {
                res.status(500).json(e)
            }
            break;
        case "POST":
            try {
                const usersCreate = await User.create(req.body)
                res.status(201).json(usersCreate)
            }catch (e: any) {
                res.status(500).json(e)
            }
            break;
        default:
            break;
    }

}

