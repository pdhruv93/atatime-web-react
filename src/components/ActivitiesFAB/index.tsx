import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Icon from "@mui/material/Icon";
import { useUserContext } from "../../context/UserContext";
import ErrorIcon from "@mui/icons-material/Error";
import Tooltip from "@mui/material/Tooltip";
import { ActivitiesInterface, AppUserInterface } from "../../interfaces";
import { toast } from "react-toastify";
import moment from "moment";
import SimilarUsers from "../SimilarUsers";

export default function ActivitiesFAB() {
  const { realmUser, appUser, setAppUser } = useUserContext();
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );
  const [selectedActivityName, setSelectedActivityName] = useState<string>("");
  const [activities, setActivities] = useState<ActivitiesInterface[] | []>([]);
  const coolingPeriod = moment(appUser?.lastActivityTime).add(0, "minutes");

  const handleActivityClick = (activityId: string, activityName: string) => {
    if (moment().isAfter(coolingPeriod)) {
      realmUser?.functions
        .addUserActivity(appUser?.userId, activityId)
        .then(() => {
          console.log("User Activity inserted to DB!!");
          setAppUser({
            ...appUser,
            lastActivityTime: new Date(),
          } as AppUserInterface);

          toast("Your activity marked successfully!!");
          setSelectedActivityId(activityId);
          setSelectedActivityName(activityName);
        });
    } else {
      toast("Wait for sometime before marking new activity!!");
    }
  };

  useEffect(() => {
    const getActivities = async () => {
      const activities = await realmUser?.functions.getAllActivities();
      setActivities(activities);
    };

    if (appUser?.location) {
      getActivities();
    }
  }, [appUser]);

  return (
    appUser && (
      <>
        <Box
          sx={{
            height: 320,
            transform: "translateZ(0px)",
            flexGrow: 1,
            position: "absolute",
            bottom: 30,
            right: 30,
          }}
        >
          <Tooltip
            title={
              appUser?.location
                ? "Mark your activities from here"
                : "Update your location under your profile in order to continue"
            }
          >
            <SpeedDial
              ariaLabel="Mark your activities from here"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              direction="left"
              icon={appUser?.location ? <SpeedDialIcon /> : <ErrorIcon />}
            >
              {activities.map((activity) => (
                <SpeedDialAction
                  key={activity._id}
                  icon={<Icon>{activity.icon}</Icon>}
                  tooltipTitle={activity.name}
                  onClick={() =>
                    handleActivityClick(activity._id, activity.name)
                  }
                />
              ))}
            </SpeedDial>
          </Tooltip>
        </Box>

        {selectedActivityId && (
          <SimilarUsers
            activityId={selectedActivityId}
            activityName={selectedActivityName}
          />
        )}
      </>
    )
  );
}
