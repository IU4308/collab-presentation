import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Presentation from "./pages/Presentation"
import Test from "./pages/Test"

function App() {

    return (
        <Routes>
            <Route index element={<Home />}/>
            <Route path="presentation/:id" element={<Presentation />}/>
            <Route path="test" element={<Test />} />
        </Routes>
    )
}

export default App
