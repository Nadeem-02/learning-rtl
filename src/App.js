import './App.css';
import { PostList } from './components/postList/postList';
import {LoginForm} from './components/loginform/loginform'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/posts' element={<PostList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
