import { PastActivitiesInterface } from '../../interfaces';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import styles from './styles/UserProfileDrawer.module.css';

export default function PastActivities(): JSX.Element {
  const { realmUser, appUser } = useUserContext();
  const [pastActivities, setPastActivities] = useState<PastActivitiesInterface[] | []>([]);

  useEffect(() => {
    const getPastActivities = async () => {
      const pastActivities = await realmUser?.functions.getPastActivities(appUser?.userId);
      setPastActivities(pastActivities);
    };

    getPastActivities();
  }, []);

  return (
    <Stack className={styles.profileOptionsStack} spacing={1}>
      <Typography variant='h6' gutterBottom component='div'>
        Your past activities
      </Typography>

      <Stack direction='row' spacing={1}>
        {pastActivities.map((activity, index) => (
          <Tooltip key={`past-activity-${index}`} title={activity.activityDetails.name}>
            <Avatar>
              <Icon>{activity.activityDetails.icon}</Icon>
            </Avatar>
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  );
}
