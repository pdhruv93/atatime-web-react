import { KeyboardEvent, MouseEvent, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SocialContacts from "./SocialContacts";
import UserLocation from "./UserLocation";
import PastActivities from "./PastActivities";

export default function UserProfileDrawer(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <div>
      <MenuItem onClick={toggleDrawer()}>
        <Typography textAlign="center">My Profile</Typography>
      </MenuItem>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer()}>
        <Box sx={{ width: 380, padding: 5 }} role="presentation">
          <Typography variant="h5" sx={{ mb: 2 }} gutterBottom component="div">
            Profile Options
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={6}>
            <UserLocation />
            <SocialContacts />
            <PastActivities />
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
