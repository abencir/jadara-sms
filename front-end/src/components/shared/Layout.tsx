import React, {ReactNode} from "react";
import Header from './Header';
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4 py-6 h-full pt-[100px]">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;