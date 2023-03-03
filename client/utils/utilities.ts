import slugify from "slugify";
export const newsTranslate = (cat: string) =>{
    const list = ['Війна', 'Політика', 'Наука та Технології', "Світ", "Технології", "Економіка"]

    switch (cat) {
        case "war":
            return list[0];
        case "politic":
            return list[1];
        case "science":
            return list[2];
        case "World":
            return list[5];
        case "economy":
            return list[7]
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