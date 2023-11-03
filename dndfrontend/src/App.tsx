 import React, { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { CharacterMaker } from './pages/CharacterMaker';
import { CharacterViewer } from './pages/CharacterViewer';
import Navbar from './components/NavBar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CharacterMaker />,
  },
  {
    path: "/character",
    element: <CharacterViewer />,
  },
])
export const App = () => {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <RouterProvider router={router}/>
    </div>
  );
}
