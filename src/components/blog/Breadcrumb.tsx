import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
    items: { name: string; path?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <ChevronRight className="w-4 h-4" />}
                    {item.path ? (
                        <Link
                            to={item.path}
                            className="hover:text-blue-400 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <span className="text-white">{item.name}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
