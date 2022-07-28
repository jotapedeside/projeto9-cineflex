import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Header.js";

export default function App() {
  return(
    <>
      <Header />
      <h1>Hello World</h1>
    </>
  )
}