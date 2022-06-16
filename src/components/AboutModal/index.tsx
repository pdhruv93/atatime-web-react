import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import HelpIcon from "@mui/icons-material/Help";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AboutModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="About">
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", bottom: 150, right: 46 }}
          onClick={handleOpen}
        >
          <HelpIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About @@time
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Stack sx={{ width: "100%" }} spacing={3}>
              <Typography>
                We've got what you need! Select your current activity and check
                how many others are doing the same activity as you. And thats
                it, @@time is ready!! Here are some points that will help you
                use the app.
              </Typography>

              <Alert severity="info">
                You must be logged in to interact with the app. In order for a
                person to communicate with you, update your contact details
                under profile. Don't worry, your data is not our source of
                income.
              </Alert>

              <Alert severity="info">
                Location information is must in order for app to work. While
                marking the activity, if your current location cannot be
                determined, your saved location is used.
              </Alert>

              <Alert severity="info">
                Can't find an activity? We try to update most common activities.
                The future release will allow users to add activities on their
                own.
              </Alert>

              <Alert severity="warning">
                Perform any interaction with other users at your own risk. Avoid
                any financial transactions. Always verify social media profiles
                on external platforms.
              </Alert>
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
