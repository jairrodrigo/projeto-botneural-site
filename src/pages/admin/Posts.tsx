import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Post } from '../../types/admin';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { categories } from '../../data/categories';

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        filterPosts();
    }, [posts, searchTerm, filterCategory, filterStatus]);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Erro ao carregar posts');
        } finally {
            setLoading(false);
        }
    };

    const filterPosts = () => {
        let filtered = [...posts];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (filterCategory !== 'all') {
            filtered = filtered.filter(post => post.category_id === filterCategory);
        }

        // Status filter
        if (filterStatus !== 'all') {
            const isDraft = filterStatus === 'draft';
            filtered = filtered.filter(post => post.is_draft === isDraft);
        }

        setFilteredPosts(filtered);
    };

    const deletePost = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este post?')) return;

        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast.success('Post excluído com sucesso');
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Erro ao excluir post');
        }
    };

    const getCategoryName = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        return category?.name || categoryId;
    };

    const getCategoryColor = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        return category?.color || 'gray';
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-400">Carregando...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Toaster position="top-right" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Posts do Blog</h1>
                        <p className="text-gray-400">Gerencie o conteúdo do blog</p>
                    </div>
                    <Link
                        to="/admin/posts/new"
                        className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Novo Post</span>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por título..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="all">Todas as categorias</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="all">Todos os status</option>
                            <option value="published">Publicados</option>
                            <option value="draft">Rascunhos</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-gray-400">
                    Mostrando {filteredPosts.length} de {posts.length} posts
                </div>

                {/* Table */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Título</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Categoria</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Data</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start space-x-3">
                                                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-white font-medium">{post.title}</div>
                                                    <div className="text-sm text-gray-400 line-clamp-1">{post.excerpt}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border bg-${getCategoryColor(post.category_id)}-500/20 text-${getCategoryColor(post.category_id)}-400 border-${getCategoryColor(post.category_id)}-500/30`}>
                                                {getCategoryName(post.category_id)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.is_draft ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-orange-500/20 text-orange-400 border-orange-500/30">
                                                    Rascunho
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">
                                                    Publicado
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300">
                                            {post.published_at
                                                ? format(new Date(post.published_at), 'dd/MM/yyyy', { locale: ptBR })
                                                : format(new Date(post.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    to={`/admin/posts/${post.id}/edit`}
                                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deletePost(post.id)}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                Nenhum post encontrado
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Posts;
