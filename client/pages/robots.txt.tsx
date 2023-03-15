import { GetServerSideProps } from 'next';
import axios from 'axios';

const SitemapXml = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
    const categories = [
        'war',
        'politic',
        'science',
        'world',
        'economy',
    ];

    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_CONNECT_URL}/api/posts`
    );


    const postUrls = response?.data
        .map((post: any) => `Allow: /news/${post.url}`)
        .join('\n');

    const categoryUrls = categories
        .map(category => `Allow: /category/${category}`)
        .join('\n');


    res.setHeader('Content-Type', 'text/plain');
    res.write('User-agent: Googlebot\n');
    res.write('Allow: /\n');
    res.write(`${categoryUrls}\n`);
    res.write(`${postUrls}\n`);
    res.write(`Allow: /about\n`);
    res.write(`Allow: /suggest\n`);
    res.write('\n');
    res.write('User-agent: *\n');
    res.write(`${categoryUrls}\n`);
    res.write(`${postUrls}\n`);
    res.write(`Allow: /about\n`);
    res.write(`Allow: /suggest\n`);
    res.end();

    return {
        props: {},
    };
};

export default SitemapXml;
