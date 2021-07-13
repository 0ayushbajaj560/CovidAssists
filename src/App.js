import "./App.css";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./components/DashBoard/DashBoard";
import CovidHistory from "./components/CovidHistory/CovidHistory";
import Vaccines from "./components/Vaccines/Vaccines";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <DashBoard />
          </Route>
          <Route exact path="/history">
            <CovidHistory />
          </Route>
          <Route exact path="/vaccines">
            <Vaccines />
          </Route>
          <Route exact path="/aboutUs">
            <AboutUs />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;