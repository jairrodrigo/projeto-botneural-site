import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Columns,
    MessageSquare,
    Calendar,
    DollarSign,
    Settings,
    FileText,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Bell,
    Search,
    User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { signOut, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/admin/login');
            toast.success('Sessão encerrada');
        } catch (error) {
            toast.error('Erro ao sair');
        }
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', gradient: 'from-cyan-500 to-blue-400' },
        { path: '/admin/inbox', icon: MessageSquare, label: 'Inbox', gradient: 'from-blue-500 to-indigo-400' },
        { path: '/admin/leads', icon: Users, label: 'Leads', gradient: 'from-emerald-500 to-green-400' },
        { path: '/admin/leads-kanban', icon: Columns, label: 'Kanban', gradient: 'from-purple-500 to-pink-400' },
        { path: '/admin/posts', icon: FileText, label: 'Blog Posts', gradient: 'from-orange-500 to-amber-400' },
        { path: '/admin/calendar', icon: Calendar, label: 'Agenda', gradient: 'from-pink-500 to-rose-400' },
        { path: '/admin/finance', icon: DollarSign, label: 'Financeiro', gradient: 'from-yellow-500 to-orange-400' },
        { path: '/admin/settings', icon: Settings, label: 'Ajustes', gradient: 'from-gray-500 to-slate-400' },
    ];

    return (
        <div className="min-h-screen bg-[#0F1419] text-slate-200 font-sans flex overflow-hidden">
            <Toaster position="top-right" />

            {/* Sidebar (Desktop) */}
            <aside
                className={`hidden md:flex flex-col border-r border-slate-800/50 bg-[#0F1419] transition-all duration-300 ease-in-out relative z-20 ${isSidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                {/* Logo Section */}
                <div className="p-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/10">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        {isSidebarOpen && <span className="font-bold text-xl text-white tracking-tight">BotNeural</span>}
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-grow p-4 space-y-3 mt-4">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group relative ${isActive
                                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/10`
                                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                {isSidebarOpen && <span className="font-medium text-[15px]">{item.label}</span>}

                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-4 px-3 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-slate-800/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all group"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        {isSidebarOpen && <span className="font-medium text-[15px]">Sair</span>}
                    </button>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute -right-3 top-20 bg-slate-800 border border-slate-700 p-1.5 rounded-full text-slate-400 hover:text-white shadow-xl hover:scale-110 transition-all"
                    >
                        {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 md:h-18 border-b border-slate-800/50 flex items-center justify-between px-6 bg-[#0F1419]/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-slate-400 hover:text-white"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden md:flex items-center gap-3 bg-slate-900/40 border border-slate-800/50 px-4 py-2 rounded-xl w-80">
                            <Search size={18} className="text-slate-500" />
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="bg-transparent border-none text-sm text-slate-200 focus:outline-none w-full placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0F1419]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-800/50">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-white leading-none mb-1">{user?.email?.split('@')[0] || 'Admin'}</p>
                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Online</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center">
                                <User size={20} className="text-slate-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Scroll Area */}
                <main className="flex-grow overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#0F1419] border-r border-slate-800/50 flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">B</span>
                                </div>
                                <span className="font-bold text-xl text-white">BotNeural</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="p-4 space-y-2 mt-4">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${isActive
                                                ? `bg-gradient-to-r ${item.gradient} text-white`
                                                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
