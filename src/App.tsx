import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Presentation from "./pages/Presentation"
// import Test from "./pages/Editor"

function App() {

    return (
        <Routes>
            <Route index element={<Home />}/>
            <Route path="presentations/:presentationId" element={<Presentation />}/>
            {/* <Route path="test" element={<Test />}/> */}
        </Routes>
    )
}

export default App
