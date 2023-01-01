// import React from "react";
// import {
//   TextField,
//   Paper,
//   Grid,
//   Divider,
//   Typography,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Fab,
//   Box,
//   List,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   chatSection: {
//     width: "100%",
//     height: "80vh",
//     marginTop:'20px'
//   },
//   headBG: {
//     backgroundColor: "#e0e0e0",
//   },
//   borderRight500: {
//     borderRight: "1px solid #e0e0e0",
//   },
//   messageArea: {
//     height: "60vh",
//     overflowY: "auto",
//   },
// });

// export const Chat = () => {
//   const classes = useStyles();

//   return (
//     <div>
//       {/* <Grid container>
//         <Grid item xs={12}>
//           <Typography variant="h5" className="header-message">
//             Chat
//           </Typography>
//         </Grid>
//       </Grid> */}
//       <Grid container component={Paper} className={classes.chatSection}>
//         <Grid item xs={3} className={classes.borderRight500}>
//           <List>
//             <ListItem button key="RemySharp">
//               <ListItemIcon>
//                 <Avatar
//                   alt="Remy Sharp"
//                   src="https://material-ui.com/static/images/avatar/1.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText sx={{size:'medium'}} primary="John Wick"></ListItemText>
//             </ListItem>
//           </List>
//           <Divider />
//           {/* <Grid item xs={12} style={{ padding: "10px" }}>
//             <TextField
//               id="outlined-basic-email"
//               label="Search"
//               variant="outlined"
//               fullWidth
//             />
//           </Grid> */}
//           {/* <Divider /> */}
//           <List>
//             <ListItem button key="RemySharp">
//               <ListItemIcon>
//                 <Avatar
//                   alt="Remy Sharp"
//                   src="https://material-ui.com/static/images/avatar/1.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
//               <ListItemText secondary="online" align="right"></ListItemText>
//             </ListItem>
//             <ListItem button key="Alice">
//               <ListItemIcon>
//                 <Avatar
//                   alt="Alice"
//                   src="https://material-ui.com/static/images/avatar/3.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText primary="Alice">Alice</ListItemText>
//             </ListItem>
//             <ListItem button key="CindyBaker">
//               <ListItemIcon>
//                 <Avatar
//                   alt="Cindy Baker"
//                   src="https://material-ui.com/static/images/avatar/2.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
//             </ListItem>
//           </List>
//         </Grid>
//         <Grid item xs={9}>
//           <List className={classes.messageArea}>
//             <ListItem key="1">
//               <Grid container>
//                 <Grid item xs={12}>
//                   <ListItemText
//                     align="right"
//                     primary="Hey man, What's up ?"
//                   ></ListItemText>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <ListItemText align="right" secondary="09:30"></ListItemText>
//                 </Grid>
//               </Grid>
//             </ListItem>
//             <ListItem key="2">
//               <Grid container>
//                 <Grid item xs={12}>
//                   <ListItemText
//                     align="left"
//                     primary="Hey, Iam Good! What about you ?"
//                   ></ListItemText>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <ListItemText align="left" secondary="09:31"></ListItemText>
//                 </Grid>
//               </Grid>
//             </ListItem>
//             <ListItem key="3">
//               <Grid container>
//                 <Grid item xs={12}>
//                   <ListItemText
//                     align="right"
//                     primary="Cool. i am good, let's catch up!"
//                   ></ListItemText>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <ListItemText align="right" secondary="10:30"></ListItemText>
//                 </Grid>
//               </Grid>
//             </ListItem>
//           </List>
//           <Divider />
//           <Grid container style={{ padding: "20px" }}>
//             <Grid item xs={11}>
//               <TextField
//                 id="outlined-basic-email"
//                 label="Type Something"
//                 fullWidth
//               />
//             </Grid>
//             <Grid xs={1} align="right">
//               <Fab color="primary" aria-label="add">
//                 <SendIcon />
//               </Fab>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

