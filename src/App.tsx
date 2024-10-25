import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import "./style/app.css";
import GlobalContextProvider from './context/GlobalContext';

function App() {
	return (
		<BrowserRouter>
			<GlobalContextProvider>
				<AppRoutes />
			</GlobalContextProvider>
		</BrowserRouter>
	)
}

export default App;
