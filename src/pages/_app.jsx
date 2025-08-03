
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import Navbar from '../componentes/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </Provider>
  );
}