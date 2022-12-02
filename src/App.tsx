import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* <Route path={'/posts/:id'} element={<Blog />}/> */}
        {/* <Route path={'/edit/:id'}  element={<Edit />}/> */}
        {routes.map(([path, Component], index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
