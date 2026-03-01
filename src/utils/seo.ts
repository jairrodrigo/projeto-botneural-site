import { BlogPost } from '../data/posts';

export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens
        .trim();
};

export const generateMetaTitle = (title: string): string => {
    return `${title} | Blog BotNeural`;
};

export const generateMetaDescription = (excerpt: string): string => {
    return excerpt.length > 155
        ? excerpt.substring(0, 152) + '...'
        : excerpt;
};

export const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

export const generateArticleSchema = (post: BlogPost, url: string) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: 'https://botneural.com.br'
        },
        publisher: {
            '@type': 'Organization',
            name: 'BotNeural',
            logo: {
                '@type': 'ImageObject',
                url: 'https://botneural.com.br/botneural_logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url
        },
        keywords: post.keywords.join(', ')
    };
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };
};
