import {GetServerSideProps} from 'next';
import axios from "axios";
const SitemapXml = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
    res.setHeader('Content-Type', 'text/xml');
    const sitemap = await generateXML()

    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

async function generateXML(): Promise<string> {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/posts`
    );

    const categories = [
        "war",
        "politic",
        "science",
        "world",
        "economy",
    ];
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${
        res?.data.map((page: any)=>{
            return `
            <url>
                <loc>${process.env.NEXT_PUBLIC_API_CONNECT_URL}/news/${page.url}</loc>
                <lastmod>${page?.updatedAt}</lastmod>
            </url>
            `
        }).join('')
    }
    
    ${
        categories.map((page: any)=>{
            return `
            <url>
                <loc>${process.env.NEXT_PUBLIC_API_CONNECT_URL}/category/${page}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </url>
            `
        }).join('')
    }
    <url>
                <loc>${process.env.NEXT_PUBLIC_API_CONNECT_URL}/about</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
            </url>
</urlset>`
}

export default SitemapXml;