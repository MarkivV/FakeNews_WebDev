import mongoose from "mongoose";

const NewsPostsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creator:{
            type: String,
            required: true,
            default: "Volodymyr Markiv"
        },
        tags: {
            type: [String],
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        published:{
            type: Boolean,
            required: true,
            default: true
        },
        category:{
            type: String,
            required: true,
            default: "Війна"
        },
    },
    { timestamps: true }
);

// {
//     "id": "1adw",
//     "title": "ЛНР та ДНР різко засудили Російську Федерацію",
//     "description": "Пряма мова представників молодих держав в ООН: Ми вважаємо Крим українською територією та вимагаємо від РФ деокупувати півострів. Кордони держав в Європі не можна перекроювати за бажанням. Такі варварські дії можуть призвести до жахливої війни.",
//     "creator": "Markiv Volodymyr",
//     "tags": [
//     "Война",
//     "Политика"
// ],
//     "image": "https://media.cnn.com/api/v1/images/stellar/prod/220225075638-01-ukraine-russia-zelensky-022522.jpg?q=h_2000,w_3000,x_0,y_0",
//     "published": true,
//     "category": 1
// }

export default mongoose.models.NewsPosts || mongoose.model("NewsPosts", NewsPostsSchema);