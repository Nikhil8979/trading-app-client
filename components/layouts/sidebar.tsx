import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import {
  Dashboard,
  Inventory,
  Assessment,
  PeopleAlt,
  Settings,
  Help,
} from "@mui/icons-material";
// import Logo from "../../../images/ottrex-logo.png";
export default function SidebarCompany() {
  const CompanySideBar = [
    {
      id: 1,
      title: "Dashboard",
      icon: <Dashboard color="primary" />,
      page: "/company/dashboard",
    },
    {
      id: 2,
      title: "Orders",
      icon: <Inventory color="primary" />,
      page: "/company/company-jobs",
    },
    {
      id: 3,
      title: "Portfolio",
      icon: <Dashboard color="primary" />,
      page: "/company/application",
    },
    {
      id: 4,
      title: "Reports",
      icon: <Assessment color="primary" />,
      page: "/company/interview-status",
    },
    {
      id: 5,
      title: "Users",
      icon: <PeopleAlt color="primary" />,
      page: "/company/interview-status",
    },
    {
      id: 6,
      title: "Settings",
      icon: <Settings color="primary" />,
      page: "/company/interview-status",
    },
    {
      id: 7,
      title: "Support/help",
      icon: <Help color="primary" />,
      page: "/company/interview-status",
    },
  ];
  return (
    <>
      <Box className="main__root" boxShadow={3}>
        <List color="primary" id="style-4">
          <ListItem className="mb-3 mt-2">
            <img
              style={{ width: "180px", height: "75px", paddingLeft: "15px" }}
              src={
                "https://i.pinimg.com/736x/da/a5/38/daa5384ccf3fc8d92fd79b880010435c.jpg"
              }
            />

            <Typography
              style={{
                fontSize: "26px",
                color: "blue",
                marginLeft: "10px",
              }}
            ></Typography>
          </ListItem>

          <Divider />
          {CompanySideBar?.map((item) => {
            return (
              <>
                <ListItem>
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText style={{ cursor: "pointer" }} color="primary">
                    {item.title}
                  </ListItemText>
                </ListItem>
              </>
            );
          })}
        </List>
      </Box>
    </>
  );
}
