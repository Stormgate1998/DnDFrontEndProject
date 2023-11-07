 import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { CharacterMaker } from './pages/CharacterMaker';
import { CharacterViewer } from './pages/CharacterViewer';
import { Character } from './objects/Character';

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
