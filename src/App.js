import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  function App2() {
    const{isLoading, error }=useAuth0
    return (
      <main className="column">
        <h1>Auth0 Login </h1>
        {error && <p>Authentication Error</p>}
        {!error&& isLoading&&<p>Loading...</p>}
        {!error&& !isLoading&&(
          <>
          <LoginButton />
          <LogoutButton />
          </>

        )}
        
      </main>
    );
  }

  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Routes>

        {}
        <App2 />

        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <Link to="/search" className="search-button">Search</Link>
        </div>
      </Router>
    </div>
  );
}

export default App;
