import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { posts } from '../data/posts';
import { categories } from '../data/categories';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/seo';
import Breadcrumb from '../components/blog/Breadcrumb';
import MidArticleCTA from '../components/blog/MidArticleCTA';
import EndArticleCTA from '../components/blog/EndArticleCTA';
import AnimatedBackground from '../components/AnimatedBackground';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = posts.find(p => p.slug === slug);

    useEffect(() => {
        // Scroll to top when post loads
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    if (post.isDraft) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Artigo em desenvolvimento</h1>
                    <p className="text-gray-400 mb-6">Este artigo ainda está sendo escrito.</p>
                    <Link to="/blog" className="text-blue-400 hover:text-blue-300">
                        ← Voltar para o blog
                    </Link>
                </div>
            </div>
        );
    }

    const category = categories.find(c => c.id === post.categoryId);
    const articleUrl = `https://botneural.com.br/blog/${post.slug}`;

    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        green: 'bg-green-500/20 text-green-400 border-green-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };

    // Generate schemas
    const articleSchema = generateArticleSchema(post, articleUrl);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://botneural.com.br' },
        { name: 'Blog', url: 'https://botneural.com.br/blog' },
        { name: post.title, url: articleUrl }
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
            <AnimatedBackground />

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* SEO Meta Tags */}
            <title>{post.metaTitle}</title>
            <meta name="description" content={post.metaDescription} />
            <meta name="keywords" content={post.keywords.join(', ')} />
            <meta property="og:title" content={post.metaTitle} />
            <meta property="og:description" content={post.metaDescription} />
            <meta property="og:image" content={post.featuredImage} />
            <meta property="og:url" content={articleUrl} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.metaTitle} />
            <meta name="twitter:description" content={post.metaDescription} />
            <meta name="twitter:image" content={post.featuredImage} />

            <div className="relative z-10">
                <article className="py-12 px-4">
                    <div className="container mx-auto max-w-4xl">
                        {/* Back Button */}
                        <Link
                            to="/blog"
                            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Voltar para o blog</span>
                        </Link>

                        {/* Breadcrumb */}
                        <Breadcrumb
                            items={[
                                { name: 'Home', path: '/' },
                                { name: 'Blog', path: '/blog' },
                                { name: post.title }
                            ]}
                        />

                        {/* Category Badge */}
                        {category && (
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-6 ${colorClasses[category.color]}`}>
                                {category.name}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8 pb-8 border-b border-white/10">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} min de leitura</span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl overflow-hidden mb-12">
                            <img
                                src={post.featuredImage}
                                alt={post.imageAlt}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="text-gray-300 leading-relaxed space-y-6">
                                {/* Placeholder for actual content */}
                                <p className="text-xl text-gray-200 font-medium">
                                    {post.excerpt}
                                </p>

                                <p>
                                    Este é um artigo em desenvolvimento. O conteúdo completo será adicionado em breve.
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-12 mb-6">
                                    Conteúdo em desenvolvimento
                                </h2>

                                <p>
                                    Estamos preparando um conteúdo completo e detalhado sobre este tema.
                                    Em breve você encontrará aqui informações valiosas sobre {post.title.toLowerCase()}.
                                </p>
                            </div>

                            {/* Mid-Article CTA */}
                            <MidArticleCTA />

                            {/* More content placeholder */}
                            <div className="text-gray-300 leading-relaxed space-y-6 mt-12">
                                <p>
                                    Continue acompanhando nosso blog para mais conteúdos sobre automação,
                                    WhatsApp Business, inteligência artificial e estratégias de vendas.
                                </p>
                            </div>
                        </div>

                        {/* End Article CTA */}
                        <EndArticleCTA />

                        {/* Related Posts Section */}
                        <div className="mt-16 pt-12 border-t border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Artigos relacionados
                            </h3>
                            <div className="text-gray-400">
                                <p>Mais artigos em breve...</p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPost;
