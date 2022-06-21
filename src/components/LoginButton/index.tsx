import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { DBResponseInterface, GoogleCredentialsInterface } from '../../interfaces';
import { toast } from 'react-toastify';
import { useGoogleMapContext } from '../../context/GoogleMapContext';
import { useUserContext } from '../../context/UserContext';
import jwtDecode from 'jwt-decode';

export default function LoginButton() {
  const { realmUser, setAppUser } = useUserContext();
  const { setMarkers } = useGoogleMapContext();

  const onSuccess = (credentials: CredentialResponse) => {
    const userDetails: GoogleCredentialsInterface = jwtDecode(credentials.credential!);

    realmUser?.functions
      .addUser(userDetails.sub, userDetails.name, userDetails.email, userDetails.picture)
      .then((res: DBResponseInterface) => {
        console.log('User Added to Database!!');
        setAppUser({
          userId: res.userId,
          name: res.name,
          email: res.email,
          profilePic: res.profilePic,
          loginCount: res.loginCount,
          soMeDetails: res.soMeDetails,
          lastActivityTime: res.lastActivityTime,
          location: res.location,
        });

        setMarkers([
          new google.maps.Marker({
            position: new google.maps.LatLng(
              Number(res.location?.locationCoords.lat),
              Number(res.location?.locationCoords.lng),
            ),
            title: 'Your Location',
            icon: {
              url: res.profilePic,
              scaledSize: new google.maps.Size(50, 50),
            },
          }),
        ]);
      });
  };

  const onFailure = () => {
    console.log('Login failed!!');
    toast('Login failed!!');
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onFailure} auto_select useOneTap />;
}
