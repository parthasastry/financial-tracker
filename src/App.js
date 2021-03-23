import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails'
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/project/:id' component={ProjectDetails} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
