import logo from './logo.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoutes from './middleware/ProtectedRoutes'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path={'/'} element={<Login />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path={'/home'} element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
