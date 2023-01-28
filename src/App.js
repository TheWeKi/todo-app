import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Header } from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './Components/Welcome';
import { Todos } from './Components/Todos';
import { Login } from './Components/Login';
import { Logout } from './Components/Logout';
import { Error404 } from './security/Error404';
import { LoginContext } from './Context/LoginContext';
import { AuthenticatedRoute } from './security/AuthenticatedRoute';
import { TodoComponent } from './Components/TodoComponent';

function App() {

	return (
		<LoginContext>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path='/' element={
						<Login />
					} />
					<Route path='/login' element={
						<Login />
					} />
					<Route path='/welcome/:username' element={
						<AuthenticatedRoute> <Welcome /> </AuthenticatedRoute> 		
					} />
					<Route path='/todos' element={
						<AuthenticatedRoute> <Todos /> </AuthenticatedRoute> 	
					} />
					<Route path='/todo/:id' element={
						<AuthenticatedRoute> <TodoComponent /> </AuthenticatedRoute> 	
					} />
					<Route path='/logout' element={
						<AuthenticatedRoute> <Logout /> </AuthenticatedRoute> 	 
					} />
					<Route path='*' element={
						<Error404 />
					} />
				</Routes>
			</BrowserRouter>
		</LoginContext>
	);
	
}

export default App;
