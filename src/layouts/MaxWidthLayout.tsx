import { ReactNode } from 'react';

type MaxWidthLayoutProps = {
    children: ReactNode;
    className?: string;
};

const MaxWidthLayout: React.FC<MaxWidthLayoutProps> = ({ children, className }) => {
    return (
            <div className={`max-w-full drop-shadow-2xl mx-auto ${className && className}`}>
                {children}
            </div>
    );
};

export default MaxWidthLayout;
