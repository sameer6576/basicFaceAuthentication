import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import { UserProvider } from "./UserProvider";
import Landing from "./Landing";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
