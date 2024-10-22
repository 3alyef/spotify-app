import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import "./style/app.css";

function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}

export default App;
