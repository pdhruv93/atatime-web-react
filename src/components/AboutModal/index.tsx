import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import HelpIcon from '@mui/icons-material/Help';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import styles from './styles/AboutModal.module.css';

export default function AboutModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title='About'>
        <Fab color='primary' aria-label='add' className={styles.modalLauncher} onClick={handleOpen}>
          <HelpIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modalContainer} sx={{ bgcolor: 'background.paper', p: 4 }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            About @@time
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <Stack className={styles.detailsStack} spacing={3}>
              <Typography>
                We&apos;ve got what you need! Select your current activity and check how many others
                are doing the same activity as you. And thats it, @@time is ready!! Here are some
                points that will help you use the app.
              </Typography>

              <Alert severity='info'>
                You must be logged in to interact with the app. In order for a person to communicate
                with you, update your contact details under profile. Don&apos;t worry, your data is
                not our source of income.
              </Alert>

              <Alert severity='info'>
                Location information is must in order for app to work. While marking the activity,
                if your current location cannot be determined, your saved location is used.
              </Alert>

              <Alert severity='info'>
                Can&apos;t find an activity? We try to update most common activities. The future
                release will allow users to add activities on their own.
              </Alert>

              <Alert severity='warning'>
                Perform any interaction with other users at your own risk. Avoid any financial
                transactions. Always verify social media profiles on external platforms.
              </Alert>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
