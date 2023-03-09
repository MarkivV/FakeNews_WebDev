import slugify from "slugify";
import nodemailer from "nodemailer"
export const newsTranslate = (cat: string) =>{
    const list = ['Війна', 'Політика', 'Наука та Технології', "Світ", "Економіка"]

    switch (cat) {
        case "war":
            return list[0];
        case "politic":
            return list[1];
        case "science":
            return list[2];
        case "world":
            return list[3];
        case "economy":
            return list[4]
        default:
            break;
    }
}

export function generateSlug(title: string) {
    return slugify(title, {
        lower: true,
        locale: 'uk',
        remove: /[*+~.()'"!:@«»ь]/g,
    });
}


// export async function sendEmail(email: string, message: string) {
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.mailgun.org',
//         port: 587,
//         secure: true,
//         auth: {
//             user: process.env.GMAIL_USERNAME,
//             pass: process.env.GMAIL_PASSWORD,
//         },
//     });
//
//     await transporter.sendMail({
//         from: process.env.GMAIL_USERNAME,
//         to: email,
//         subject: 'Registration Confirmation',
//         text: message,
//     });
// }


