import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { useState, useContext } from 'react';
import { TokenContext } from './context/TokenContext';

/* Components */
import NavSelector from './helpers/NavSelector';
import Footer from './views/Global/Footer';
import Home from './views/Home/Home';
import ShowsSelector from './views/Shows/ShowsSelector';
import ShowCategories from './views/ShowCategories/ShowCategories';
import SearchedShows from './views/SearchShows/SearchedShows';
import PageNotFound from './views/Global/PageNotFound';
import ShowDetails from './views/ShowDetail/ShowDetails';
import Login from './views/Login/Login';
import SignUp from './views/Login/SignUp';
import SignUpConfirmation from './views/Login/SignUpConfirmation';
import Saved from './views/Saved/Saved';

function App() {
  const { token } = useContext(TokenContext);
  return (
    <>
      <BrowserRouter>
        <NavSelector />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/Show/:showType" element={<ShowsSelector />}></Route>
          <Route path="/Show/:showType/:showCategorie" element={<ShowCategories />}></Route>
          <Route path="/Search/" element={<SearchedShows />} />
          <Route path="/Search/:typed" element={<SearchedShows />} />
          <Route path="/Show/:showType/Detail/:showId" element={<ShowDetails />} />
          {token == null ? (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Show/Saved" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route path="/Show/Saved" element={<Saved />} />
          )}

          <Route path="/SignUp/Confirmation" element={<SignUpConfirmation />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
