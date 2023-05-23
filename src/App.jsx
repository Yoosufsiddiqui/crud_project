import { Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';

function App() {
	return (
		<>
			<Header />
			<Container>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/posts" element={<Posts />} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
			<Footer />
		</>
	);
}

export default App;
