import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useUserContext } from "../../context/UserContext";
import { PastActivitiesInterface } from "../../interfaces";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function PastActivities(): JSX.Element {
  const { realmUser, appUser } = useUserContext();
  const [pastActivities, setPastActivities] = useState<
    PastActivitiesInterface[] | []
  >([]);

  useEffect(() => {
    const getPastActivities = async () => {
      const pastActivities = await realmUser?.functions.getPastActivities(
        appUser?.userId
      );
      setPastActivities(pastActivities);
    };

    getPastActivities();
  }, []);

  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Typography variant="h6" gutterBottom component="div">
        Your past activities
      </Typography>

      <Stack direction="row" spacing={1}>
        {pastActivities.map((activity, index) => (
          <Tooltip
            key={`past-activity-${index}`}
            title={activity.activityDetails.name}
          >
            <Avatar>
              <Icon>{activity.activityDetails.icon}</Icon>
            </Avatar>
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  );
}
