import * as yup from 'yup';
import { AppUserInterface, DBResponseInterface } from '../../interfaces';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useUserContext } from '../../context/UserContext';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SocialContacts(): JSX.Element {
  const { realmUser, appUser, setAppUser } = useUserContext();
  const phoneRegExp = new RegExp('/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im');

  const validationSchema = yup.object({
    fbUsername: yup.string(),
    igHandle: yup.string(),
    waNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  });

  const formik = useFormik({
    initialValues: {
      fbUsername: appUser?.soMeDetails?.fbUsername,
      igHandle: appUser?.soMeDetails?.igHandle,
      waNumber: appUser?.soMeDetails?.waNumber,
    },
    validationSchema,
    onSubmit: (formValues) => {
      realmUser?.functions
        .updateSoMeDetails(appUser?.userId, {
          fbUsername: formValues.fbUsername,
          igHandle: formValues.igHandle,
          waNumber: formValues.waNumber,
        })
        .then((res: DBResponseInterface) => {
          console.log('SoMe details updated for user at DB!!');
          setAppUser({
            ...appUser,
            soMeDetails: res.soMeDetails,
          } as AppUserInterface);

          toast('SoMe details updated for user at DB!!');
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ width: '100%' }} spacing={1}>
        <Typography variant='h6' gutterBottom component='div'>
          Contact
        </Typography>

        <Alert severity='info'>Allows other uses to connect with you</Alert>

        <TextField
          label='Your Facebook username'
          variant='outlined'
          sx={{ mb: 2 }}
          fullWidth
          id='fbUsername'
          defaultValue={formik.values.fbUsername}
          onChange={formik.handleChange}
        />

        <TextField
          label='Your Insta Handle'
          variant='outlined'
          sx={{ mb: 2 }}
          fullWidth
          id='igHandle'
          defaultValue={formik.values.igHandle}
          onChange={formik.handleChange}
        />

        <TextField
          label='Your Whatsapp Number(+23XXXXXX)'
          variant='outlined'
          sx={{ mb: 2 }}
          fullWidth
          id='waNumber'
          defaultValue={formik.values.waNumber}
          onChange={formik.handleChange}
          error={formik.touched.waNumber && Boolean(formik.errors.waNumber)}
          helperText={formik.errors.waNumber}
        />

        <Box>
          <Button variant='contained' type='submit'>
            Update
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
