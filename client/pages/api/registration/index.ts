import dbConnect from "../../../utils/dbConnect";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from 'bcrypt';
import {User} from "../../../models/User";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';


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
        const token = uuidv4();
        const userAdded = await User.create({email, name, password: hashedPassword, token: token})
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.mailgun.org',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD,
                },
            });
            const emailVerify = await transporter.sendMail({
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: 'Підтвердження реєстрації',
                text: "https://localhost:3000/token/"+token,
                html: "<html style=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\">\n" +
                    "<head>\n" +
                    "<meta name=\"viewport\" content=\"width=device-width\" />\n" +
                    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
                    "<title>Actionable emails e.g. reset password</title>\n" +
                    "\n" +
                    "\n" +
                    "<style type=\"text/css\">\n" +
                    "img {\n" +
                    "max-width: 100%;\n" +
                    "}\n" +
                    "body {\n" +
                    "-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;\n" +
                    "}\n" +
                    "body {\n" +
                    "background-color: #f6f6f6;\n" +
                    "}\n" +
                    "@media only screen and (max-width: 640px) {\n" +
                    "  body {\n" +
                    "    padding: 0 !important;\n" +
                    "  }\n" +
                    "  h1 {\n" +
                    "    font-weight: 800 !important; margin: 20px 0 5px !important;\n" +
                    "  }\n" +
                    "  h2 {\n" +
                    "    font-weight: 800 !important; margin: 20px 0 5px !important;\n" +
                    "  }\n" +
                    "  h3 {\n" +
                    "    font-weight: 800 !important; margin: 20px 0 5px !important;\n" +
                    "  }\n" +
                    "  h4 {\n" +
                    "    font-weight: 800 !important; margin: 20px 0 5px !important;\n" +
                    "  }\n" +
                    "  h1 {\n" +
                    "    font-size: 22px !important;\n" +
                    "  }\n" +
                    "  h2 {\n" +
                    "    font-size: 18px !important;\n" +
                    "  }\n" +
                    "  h3 {\n" +
                    "    font-size: 16px !important;\n" +
                    "  }\n" +
                    "  .container {\n" +
                    "    padding: 0 !important; width: 100% !important;\n" +
                    "  }\n" +
                    "  .content {\n" +
                    "    padding: 0 !important;\n" +
                    "  }\n" +
                    "  .content-wrap {\n" +
                    "    padding: 10px !important;\n" +
                    "  }\n" +
                    "  .invoice {\n" +
                    "    width: 100% !important;\n" +
                    "  }\n" +
                    "}\n" +
                    "</style>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body itemscope itemtype=\"http://schema.org/EmailMessage\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;\" bgcolor=\"#f6f6f6\">\n" +
                    "\n" +
                    "<table class=\"body-wrap\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;\" bgcolor=\"#f6f6f6\"><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;\" valign=\"top\"></td>\n" +
                    "    <td class=\"container\" width=\"600\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;\" valign=\"top\">\n" +
                    "      <div class=\"content\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;\">\n" +
                    "        <table class=\"main\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" itemprop=\"action\" itemscope itemtype=\"http://schema.org/ConfirmAction\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;\" bgcolor=\"#fff\"><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td class=\"content-wrap\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;\" valign=\"top\">\n" +
                    "              <meta itemprop=\"name\" content=\"Confirm Email\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\" /><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td class=\"content-block\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\" valign=\"top\">\n" +
                    "                    \n" +
                    "          Будь-ласка підтвердіть свій email клікнувши на посилання нижче.                  </td>\n" +
                    "                </tr><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td class=\"content-block\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\" valign=\"top\">\n" +
                    "                    \n" +
                    "                  </td>\n" +
                    "                </tr><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td class=\"content-block\" itemprop=\"handler\" itemscope itemtype=\"http://schema.org/HttpActionHandler\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\" valign=\"top\">\n" +
                    "                    <a href=\""+process.env.NEXT_PUBLIC_API_CONNECT_URL+"/token/"+token+"\" class=\"btn-primary\" itemprop=\"url\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;\">Підтвердити email</a>\n" +
                    "                  </td>\n" +
                    "                </tr><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td class=\"content-block\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;\" valign=\"top\">\n" +
                    "                    &mdash; Бражкович\n" +
                    "                  </td>\n" +
                    "                </tr></table></td>\n" +
                    "          </tr></table><div class=\"footer\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;\">\n" +
                    "          <table width=\"100%\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><tr style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;\"><td class=\"aligncenter content-block\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;\" align=\"center\" valign=\"top\">Підписатись <a href=\"http://t.me/brazhkovich\" style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;\">@brazhkovich</a> в Telegram.</td>\n" +
                    "            </tr></table></div></div>\n" +
                    "    </td>\n" +
                    "    <td style=\"font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;\" valign=\"top\"></td>\n" +
                    "  </tr></table></body>\n" +
                    "</html>"
            })
        }catch (err){
            console.log(err)
        }
        res.status(200).json(userAdded)
        return;
    } catch (error) {
        res.status(500).json(error)
        return;
    }

}