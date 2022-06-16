import { SimilarUsersInterface, SimilarUsersPropsInterface } from '../../interfaces';
import { useGoogleMapContext } from '../../context/GoogleMapContext';
import { useUserContext } from '../../context/UserContext';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React, { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function SimilarUsers({
  activityId,
  activityName,
}: SimilarUsersPropsInterface): JSX.Element {
  const { realmUser } = useUserContext();
  const { setMarkers } = useGoogleMapContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [similarUsers, setSimilarUsers] = useState<SimilarUsersInterface[] | []>([]);

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

  useEffect(() => {
    setIsOpen(activityId != null);
  }, [activityId]);

  useEffect(() => {
    const getSimilarUsers = async () => {
      console.log('Getting other users doing similar activity');
      realmUser?.functions.getSimilarUsers(activityId).then((res: SimilarUsersInterface[]) => {
        console.log('Successfully fetched similar users from DB!!');
        setSimilarUsers(res);
      });
    };

    if (activityId) {
      getSimilarUsers();
    }
  }, [activityId]);

  useEffect(() => {
    const markers = similarUsers.map((user) => {
      return new google.maps.Marker({
        position: new google.maps.LatLng(
          Number(user.userDetails.location?.locationCoords.lat),
          Number(user.userDetails.location?.locationCoords.lng),
        ),
        title: `${user.userDetails.name}, ${user.userDetails.location?.locationName}`,
      });
    });

    setMarkers(markers);
  }, [similarUsers]);

  return (
    <Drawer anchor='left' open={isOpen} onClose={toggleDrawer()}>
      <Box sx={{ width: 380, padding: 5 }} role='presentation'>
        <Typography component='div'></Typography>

        <Typography variant='h5' sx={{ mb: 2 }} component='div'>
          Users doing the same activity as you
          <Box fontWeight='fontWeightMedium' display='inline'>
            {` ${activityName}`}
          </Box>
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {similarUsers.map((similarUser, index) => {
            const user = similarUser.userDetails;

            return (
              <React.Fragment key={`similar-user-${index}`}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user.profilePic} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <Stack component='span' spacing={1}>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {user.location?.locationName}
                        </Typography>

                        <Stack direction='row' component='span' alignItems='center' spacing={1}>
                          {user.soMeDetails?.fbUsername && (
                            <IconButton
                              aria-label='facebook'
                              size='small'
                              onClick={() =>
                                window.open(
                                  `https://www.facebook.com/${user.soMeDetails?.fbUsername}`,
                                  '_blank',
                                )
                              }
                            >
                              <FacebookIcon />
                            </IconButton>
                          )}

                          {user.soMeDetails?.igHandle && (
                            <IconButton
                              aria-label='instagram'
                              size='small'
                              onClick={() =>
                                window.open(
                                  `https://www.instagram.com/${user.soMeDetails?.igHandle}`,
                                  '_blank',
                                )
                              }
                            >
                              <InstagramIcon />
                            </IconButton>
                          )}

                          {user.soMeDetails?.waNumber && (
                            <IconButton
                              aria-label='whatsapp'
                              size='small'
                              onClick={() =>
                                window.open(`https://wa.me/${user.soMeDetails?.waNumber}`, '_blank')
                              }
                            >
                              <WhatsAppIcon />
                            </IconButton>
                          )}
                        </Stack>
                      </Stack>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
