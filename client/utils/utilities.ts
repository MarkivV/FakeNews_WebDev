import slugify from "slugify";
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


