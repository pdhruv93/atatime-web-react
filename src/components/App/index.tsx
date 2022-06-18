import 'react-toastify/dist/ReactToastify.css';
import * as Realm from 'realm-web';
import { AppUserInterface } from '../../interfaces';
import { GoogleMapContext } from '../../context/GoogleMapContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { customTheme } from '../../theme';
import { getUser } from '../../database';
import { useEffect, useState } from 'react';
import AboutModal from '../AboutModal';
import CssBaseline from '@mui/material/CssBaseline';
import FloatingBar from '../ActivitiesFAB';
import MapView from '../MapView';
import Navbar from '../Navbar';

function App(): JSX.Element {
  const [realmUser, setRealmUser] = useState<Realm.User | null>(null);
  const [appUser, setAppUser] = useState<AppUserInterface | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[] | []>([]);

  useEffect(() => {
    const getRealmUser = async () => {
      const realmUser = await getUser();
      setRealmUser(realmUser || null);
    };

    getRealmUser();
  }, []);

  return realmUser ? (
    <ThemeProvider theme={customTheme}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <CssBaseline />
        <UserContext.Provider value={{ realmUser, appUser, setAppUser }}>
          <GoogleMapContext.Provider value={{ map, setMap, markers, setMarkers }}>
            <MapView />
            <Navbar />
            <FloatingBar />
            <AboutModal />
            <ToastContainer position='bottom-left' newestOnTop={false} limit={1} />
          </GoogleMapContext.Provider>
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  ) : (
    <h2>Connecting to Database...</h2>
  );
}

export default App;
