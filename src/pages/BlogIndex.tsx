import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import PostCard from '../components/blog/PostCard';
import SearchBar from '../components/blog/SearchBar';
import CategoryFilter from '../components/blog/CategoryFilter';
import AnimatedBackground from '../components/AnimatedBackground';

const BlogIndex: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter posts based on search and category
    const filteredPosts = useMemo(() => {
        return posts
            .filter(post => !post.isDraft) // Only show published posts
            .filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = !selectedCategory || post.categoryId === selectedCategory;
                return matchesSearch && matchesCategory;
            });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl text-center">
                        <Link
                            to="/"
                            className="inline-block text-blue-400 hover:text-blue-300 mb-6 transition-colors"
                        >
                            ← Voltar para home
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BotNeural</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                            Conteúdos sobre automação, WhatsApp, IA e vendas para empresas.
                        </p>

                        {/* Search Bar */}
                        <div className="mb-8">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </div>

                        {/* Category Filter */}
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-6xl">
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg">
                                    Nenhum artigo encontrado. Tente outra busca ou categoria.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-10 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Pronto para automatizar seu WhatsApp?
                            </h2>
                            <p className="text-gray-300 mb-6 text-lg">
                                Agende uma consulta gratuita e descubra como transformar seu atendimento.
                            </p>
                            <Link
                                to="/#hero"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-all font-semibold shadow-lg shadow-blue-500/25"
                            >
                                <span>Falar com especialista</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BlogIndex;
