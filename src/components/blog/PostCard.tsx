import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../data/posts';
import { categories } from '../../data/categories';

interface PostCardProps {
    post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const category = categories.find(c => c.id === post.categoryId);

    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        green: 'bg-green-500/20 text-green-400 border-green-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };

    return (
        <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group">
            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
                <img
                    src={post.featuredImage}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            <div className="p-6">
                {/* Category Badge */}
                {category && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${colorClasses[category.color]}`}>
                        {category.name}
                    </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{post.readingTime} min de leitura</span>
                    </div>

                    <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold text-sm"
                    >
                        <span>Ler artigo</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
