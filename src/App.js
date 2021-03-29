import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Header from "./Header";
import Projects from './Projects';
import Footer from "./Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Projects />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
