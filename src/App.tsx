import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const BlogFeed = React.lazy(() => import('./pages/BlogFeed'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div className="h-screen bg-gray-950 flex flex-col items-center justify-center text-white/50 font-mono text-sm tracking-[0.2em] uppercase"><span className="animate-pulse">Loading System...</span></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={<BlogFeed />} />
                    <Route path="/blogs/:slug" element={<BlogPost />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
