import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}>
            <div style={{ display: value === index ? 'block': 'none'}}>
                {children}
            </div>

        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function TeacherClassSessionMenu({item1, item2,item3}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {/*<Tab label="Understanding Meters" {...a11yProps(0)} />*/}
                <Tab label="Quizzes" {...a11yProps(0)} />
                <Tab label="Exit Tickets" {...a11yProps(1)} />
                <Tab label="Polls" {...a11yProps(2)} />
            </Tabs>

            {/*<TabPanel value={value} index={0}>*/}
            {/*    {item1}*/}
            {/*</TabPanel>*/}
            <TabPanel value={value} index={0}>
                {item1}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {item2}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {item3}
            </TabPanel>
        </div>
    );
}