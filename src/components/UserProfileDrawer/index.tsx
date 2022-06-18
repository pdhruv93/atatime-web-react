import { KeyboardEvent, MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import PastActivities from './PastActivities';
import SocialContacts from './SocialContacts';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UserLocation from './UserLocation';
import styles from './styles/UserProfileDrawer.module.css';

export default function UserProfileDrawer(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <div>
      <MenuItem onClick={toggleDrawer()}>
        <Typography textAlign='center'>My Profile</Typography>
      </MenuItem>

      <Drawer anchor='right' open={isOpen} onClose={toggleDrawer()}>
        <Box className={styles.drawerContainer} sx={{ p: 5 }} role='presentation'>
          <Typography variant='h5' sx={{ mb: 2 }} gutterBottom component='div'>
            Profile Options
          </Typography>

          <Stack className={styles.profileOptionsStack} spacing={6}>
            <UserLocation />
            <SocialContacts />
            <PastActivities />
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
