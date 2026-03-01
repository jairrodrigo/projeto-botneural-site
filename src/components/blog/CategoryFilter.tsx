import React from 'react';
import { categories, Category } from '../../data/categories';

interface CategoryFilterProps {
    selectedCategory: string | null;
    onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30',
        green: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30'
    };

    const activeClasses = {
        blue: 'bg-blue-500/40 border-blue-500',
        green: 'bg-green-500/40 border-green-500',
        purple: 'bg-purple-500/40 border-purple-500',
        cyan: 'bg-cyan-500/40 border-cyan-500'
    };

    return (
        <div className="flex flex-wrap justify-center gap-3">
            <button
                onClick={() => onSelectCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${selectedCategory === null
                        ? 'bg-white/20 text-white border-white'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                    }`}
            >
                Todos
            </button>

            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${selectedCategory === category.id
                            ? activeClasses[category.color]
                            : colorClasses[category.color]
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
