import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Presentation from "./pages/Presentation"

function App() {

    return (
        <Routes>
            <Route index element={<Home />}/>
            <Route path="presentation/:id" element={<Presentation />}/>
        </Routes>
    )
}

export default App
