import axios from "axios";
import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from 'bcrypt';
import {User} from "../../../models/User";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const { email, name, password } = req.body

    await dbConnect()

    try {
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).send({ message: 'User already exists' })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userAdded = await User.create({email, name, password: hashedPassword})
        res.status(200).json(userAdded)
        res.redirect("/")
        return;
    } catch (error) {
        res.status(500).json(error)
        return;
    }

}