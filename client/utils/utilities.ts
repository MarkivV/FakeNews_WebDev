
import axios from "axios";

export const newsTranslate = (cat: string) =>{
    const list = ['Війна', 'Політика', 'Наука та Технології', "Шоу-бізнес", "Україна", "Світ", "Технології", "Економіка"]

    switch (cat) {
        case "war":
            return list[0];
        case "politic":
            return list[1];
        case "science":
            return list[2];
        case "show-business":
            return list[3];
        case "Ukraine":
            return list[4];
        case "World":
            return list[5];
        case "economy":
            return list[7]
        default:
            break;
    }
}

//
// export const fetchLastFivePosts = async () => {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news/fetchLastFivePosts`);
//     return res.data;
// };
//
// export const fetchTopThreeRatedPosts = async () => {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news/fetchTopThreeRatedPosts`);
//     return res.data;
// };
//
// export const fetchPostsByCategory = async () => {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/news/fetchPostsByCategory`);
//     return res.data;
// };
