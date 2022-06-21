import * as yup from 'yup';
import { AppUserInterface, DBResponseInterface } from '../../interfaces';
import { Autocomplete } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useGoogleMapContext } from '../../context/GoogleMapContext';
import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './styles/UserProfileDrawer.module.css';

export default function UserLocation(): JSX.Element {
  const { realmUser, appUser, setAppUser } = useUserContext();
  const { setMarkers } = useGoogleMapContext();
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);

  const validationSchema = yup.object({
    locationName: yup.string().required('Location is required'),
    locationCoords: yup.object().shape({
      lat: yup.string().required(),
      lng: yup.string().required(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      locationName: appUser?.location?.locationName,
    },
    validationSchema,
    onSubmit: (formValues) => {
      realmUser?.functions
        .updateUserLocation(appUser?.userId, formValues)
        .then((res: DBResponseInterface) => {
          console.log('Location details updated for user at DB!!');
          setAppUser({
            ...appUser,
            location: res.location,
          } as AppUserInterface);

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

          toast('All set. You can now start tagging your activity!!');
        });
    },
  });

  const onAutoCompleteLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    const lat = autoComplete?.getPlace()?.geometry?.location?.lat();
    const lng = autoComplete?.getPlace()?.geometry?.location?.lng();

    formik.setFieldValue('locationCoords', { lat, lng });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack className={styles.profileOptionsStack} spacing={1}>
        <Typography variant='h6' gutterBottom component='div'>
          Location
        </Typography>

        <Autocomplete onLoad={onAutoCompleteLoad} onPlaceChanged={onPlaceChanged}>
          <TextField
            label='Update your Location'
            variant='outlined'
            sx={{ mb: 2 }}
            fullWidth
            id='locationName'
            defaultValue={formik.values.locationName}
            onChange={formik.handleChange}
            error={formik.touched.locationName && Boolean(formik.errors.locationName)}
            helperText={formik.errors.locationName}
          />
        </Autocomplete>

        <Box>
          <Button variant='contained' type='submit'>
            Update
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
