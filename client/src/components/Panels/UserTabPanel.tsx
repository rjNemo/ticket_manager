import React, { FC, useState, ReactNode } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import ProjectList from "../Lists/ProjectList";
import TicketList from "../Lists/TicketList";
import Ticket from "../../types/Ticket";
import Project from "../../types/Project";
import User from "../../types/User";

interface TabProps {
  children?: ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel: FC<TabProps> = (props: TabProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#E9ECEF",
    borderRadius: "20px",
  },
  topbar: { borderTopLeftRadius: "10px", borderTopRightRadius: "10px" },
}));

interface IProps {
  tabNames: string[];
  tickets: Ticket[];
  projects: Project[];
}

const UserTabPanel: FC<IProps> = ({ tickets, tabNames, projects }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.topbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          {tabNames.map((t: string, i: number) => (
            <Tab key={i} label={t} {...a11yProps({ i })} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProjectList projects={projects} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TicketList tickets={tickets} allProjects={[]} addButton={false} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};
export default UserTabPanel;
