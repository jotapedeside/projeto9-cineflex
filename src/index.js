import reactDom from 'react-dom';
import "./assets/reset.css"
import "./assets/style.css";
import App from './components/App';

reactDom.render(<App />, document.querySelector('.root'));