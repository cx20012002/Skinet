import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    url?: string;
}

interface Props{
    productName?: string;
    separator?: string;
}

const Breadcrumb = ({productName, separator = '/'}: Props) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const last = pathnames[pathnames.length - 1];
    const isId = !isNaN(parseInt(last));

    const items = pathnames.slice(0, -1).map((name, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        return {
            label: name,
            url: url
        }as BreadcrumbItem;
    });

    if (isId) {
        items.push({ label: productName! });
    } else {
        items.push({ label: last });
    }

    return (
        <nav className="flex mb-10" aria-label="Breadcrumb">
            <ol className="flex items-center">
                <Link to="/" className="text-blue-500 hover:text-blue-800 text-xl">
                    Home {separator} &nbsp;
                </Link>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.url ? (
                            <Link to={item.url} className="text-blue-500 hover:text-gray-600 text-xl">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-400 text-xl">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className="text-gray-400 text-xl">&nbsp; {separator} &nbsp;</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;