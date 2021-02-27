import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux';
import store from './store.js'
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)