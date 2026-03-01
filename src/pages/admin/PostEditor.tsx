import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Eye } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Post } from '../../types/admin';
import toast, { Toaster } from 'react-hot-toast';
import { categories } from '../../data/categories';
import { generateSlug, calculateReadingTime } from '../../utils/seo';

const PostEditor: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isDraft, setIsDraft] = useState(true);

    const editor = useEditor({
        extensions: [StarterKit, Link, Image],
        content: '<p>Escreva seu conteúdo aqui...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[400px] focus:outline-none px-4 py-3'
            }
        }
    });

    useEffect(() => {
        if (isEdit && id) {
            fetchPost(id);
        }
    }, [id, isEdit]);

    useEffect(() => {
        // Auto-generate slug from title
        if (title && !isEdit) {
            setSlug(generateSlug(title));
        }
    }, [title, isEdit]);

    useEffect(() => {
        // Auto-fill meta title
        if (title && !metaTitle) {
            setMetaTitle(`${title} | BotNeural`);
        }
    }, [title]);

    useEffect(() => {
        // Auto-fill meta description
        if (excerpt && !metaDescription) {
            setMetaDescription(excerpt.substring(0, 155));
        }
    }, [excerpt]);

    const fetchPost = async (postId: string) => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (error) throw error;

            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setExcerpt(data.excerpt);
                setCategoryId(data.category_id);
                setFeaturedImage(data.featured_image || '');
                setImageAlt(data.image_alt || '');
                setMetaTitle(data.meta_title || '');
                setMetaDescription(data.meta_description || '');
                setKeywords(data.keywords?.join(', ') || '');
                setIsDraft(data.is_draft);
                if (editor && data.content) {
                    editor.commands.setContent(data.content);
                }
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            toast.error('Erro ao carregar post');
            navigate('/admin/posts');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (publish: boolean = false) => {
        if (!title || !slug || !excerpt || !categoryId) {
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        const content = editor?.getHTML() || '';
        if (!content || content === '<p></p>') {
            toast.error('O conteúdo não pode estar vazio');
            return;
        }

        setSaving(true);

        try {
            const keywordsArray = keywords
                .split(',')
                .map(k => k.trim())
                .filter(k => k.length > 0);

            const readingTime = calculateReadingTime(content);

            const postData: Partial<Post> = {
                title,
                slug,
                excerpt,
                content,
                category_id: categoryId,
                featured_image: featuredImage || null,
                image_alt: imageAlt || null,
                meta_title: metaTitle || `${title} | BotNeural`,
                meta_description: metaDescription || excerpt.substring(0, 155),
                keywords: keywordsArray,
                reading_time: readingTime,
                is_draft: !publish,
                published_at: publish ? new Date().toISOString() : null
            };

            if (isEdit && id) {
                const { error } = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', id);

                if (error) throw error;
                toast.success('Post atualizado com sucesso');
            } else {
                const { error } = await supabase
                    .from('posts')
                    .insert([postData]);

                if (error) throw error;
                toast.success('Post criado com sucesso');
            }

            navigate('/admin/posts');
        } catch (error: any) {
            console.error('Error saving post:', error);
            if (error.code === '23505') {
                toast.error('Já existe um post com este slug');
            } else {
                toast.error('Erro ao salvar post');
            }
        } finally {
            setSaving(false);
        }
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

            <div className="space-y-6 max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isEdit ? 'Editar Post' : 'Novo Post'}
                        </h1>
                        <p className="text-gray-400">Preencha os campos abaixo</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/admin/posts')}
                            className="flex items-center space-x-2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                            <span>Cancelar</span>
                        </button>
                        <button
                            onClick={() => handleSave(false)}
                            disabled={saving}
                            className="flex items-center space-x-2 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            <span>Salvar Rascunho</span>
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            disabled={saving}
                            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            <Eye className="w-5 h-5" />
                            <span>Publicar</span>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">Informações Básicas</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Título *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Digite o título do post"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Slug (URL) *
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="slug-do-post"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                URL: /blog/{slug || 'slug-do-post'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Categoria *
                            </label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Resumo *
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                maxLength={200}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                placeholder="Breve resumo do post (máx. 200 caracteres)"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {excerpt.length}/200 caracteres
                            </p>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Conteúdo *</h2>
                        <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                            <EditorContent editor={editor} />
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">Imagem Destaque</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                URL da Imagem
                            </label>
                            <input
                                type="text"
                                value={featuredImage}
                                onChange={(e) => setFeaturedImage(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Texto Alternativo (Alt)
                            </label>
                            <input
                                type="text"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Descrição da imagem para SEO"
                            />
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">SEO</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                maxLength={60}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Título para SEO (máx. 60 caracteres)"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {metaTitle.length}/60 caracteres
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                rows={2}
                                maxLength={155}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                placeholder="Descrição para SEO (máx. 155 caracteres)"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                {metaDescription.length}/155 caracteres
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Palavras-chave
                            </label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="palavra1, palavra2, palavra3"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Separe as palavras-chave com vírgulas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PostEditor;
