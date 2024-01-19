import * as React from "react";
import { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import LanguageTable from "./LanguageTable.jsx";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchData, postData, deleteData, editData } from "./Api.jsx";

/**
 *  Displays Copyright data
 * @function
 * @param {Props} props
 * @returns {JSX.Element}- Copyright Component
 */
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Learn Languages App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

/**
 * Admin Dashboard component for data manipulation.
 *
 * @component
 * @returns {JSX.Element} The JSX element of the Admin Dashboard component.
 */
export default function AdminDash() {
  /**
   * State variable for English language data.
   * @type {Array}
   */
  const [engData, setEngData] = useState([]);
  /**
   * State variable for Swedish language data.
   * @type {Array}
   */
  const [swedishData, setSwedishData] = useState([]);
  /**
   * State variable for Korean language data.
   * @type {Array}
   */
  const [koreanData, setKoreanData] = useState([]);
  /**
   * State variable for English language tags.
   * @type {Array}
   */
  const [engTags, setEngTags] = useState([]);
  /**
   * State variable for Swedish language tags.
   * @type {Array}
   */
  const [swedishTags, setSwedishTags] = useState([]);
  /**
   * State variable for Korean language tags.
   * @type {Array}
   */
  const [koreanTags, setKoreanTags] = useState([]);
  /**
   * State variable for chosen table language.
   * @type {Array}
   */
  const [tableLang, setTableLang] = useState([]);
  /**
   * State variable for selected language.
   * @type {Array}
   */
  const [language, setLanguage] = useState([]);
  /**
   * React Router navigation hook.
   * @type {function}
   */
  const navigate = useNavigate();
  /**
   * State variable for the drawer's open/close status.
   * @type {boolean}
   */
  const [open, setOpen] = React.useState(true);
  /**
   * Toggles the drawer open and close.
   *
   * @function
   * @returns {void}
   */
  const toggleDrawer = () => {
    setOpen(!open);
  };

  /**
   * Fetches language data for English, Swedish, and Korean from the server.
   *
   * @async
   * @function
   * @property {array} eng - Stores the english language data in an array
   * @property {array} swedish - Stores the swedish language data in an array
   * @property {array} korean - Stores the korean language data in an array
   * @returns {Promise<void>} A Promise that resolves once the data is fetched and state is updated.
   */
  const fetchLanguageData = async () => {
    try {
      const [eng, swedish, korean] = await Promise.all([
        fetchData("/api/languages/english"),
        fetchData("/api/languages/swedish"),
        fetchData("/api/languages/korean"),
      ]);

      setEngData(eng);
      setEngTags([
        ...new Set(
          eng
            .map((word) => word.tag)
            .filter((tag) => tag !== null && tag !== "NULL")
        ),
      ]);

      setSwedishData(swedish);
      setSwedishTags([
        ...new Set(
          swedish
            .map((word) => word.tag)
            .filter((tag) => tag !== null && tag !== "NULL")
        ),
      ]);

      setKoreanData(korean);
      setKoreanTags([
        ...new Set(
          korean
            .map((word) => word.tag)
            .filter((tag) => tag !== null && tag !== "NULL")
        ),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLanguageData();
  }, []);

  /**
   * Handles log out process for users.
   *
   * @function
   */
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  /**
   * Loads language data into the table based on the selected language.
   *
   * @function
   * @param {Array} langData - Array of language data.
   * @param {string} language - The selected language.
   * @returns {void}
   */
  const handleLoadTable = (langData, language) => {
    setTableLang(langData);
    setLanguage(language);
  };

  /**
   * Updates the table language state variable.
   *
   * @function
   * @param {Array} newTableLang - Updated table language data.
   * @returns {void}
   */
  const handleUpdateTableLang = (newTableLang) => {
    setTableLang(newTableLang);
  };

  /**
   * Handles the addition of new words to the language table.
   *
   * @async
   * @function
   * @param {Object} data - New word data.
   * @returns {Promise<void>} A Promise that resolves once the new words are added and state is updated.
   */
  const handleAddNewWords = async (data) => {
    try {
      const res = await postData(`/api/languages/${language}`, data);
      const newData = await fetchData(`/api/languages/${language}`);
      if (language === "english") {
        setEngData(newData);
      } else if (language === "swedish") {
        setSwedishData(newData);
      } else if (language === "korean") {
        setKoreanData(newData);
      }

      setTableLang(newData);
    } catch (error) {
      console.log("Error while adding new word pairs");
    }
  };

  /**
   * Handles the deletion of words from the language table.
   *
   * @async
   * @function
   * @param {string} id - The ID of the word to be deleted.
   * @returns {Promise<void>} A Promise that resolves once the word is deleted and state is updated.
   */
  const handleDeleteWords = async (id) => {
    try {
      await deleteData(`/api/languages/${language}/${id}`);
      const newData = await fetchData(`/api/languages/${language}`);
      if (language === "english") {
        setEngData(newData);
      } else if (language === "swedish") {
        setSwedishData(newData);
      } else if (language === "korean") {
        setKoreanData(newData);
      }

      setTableLang(newData);
    } catch (error) {
      console.log("Error while deleting words");
    }
  };

  /**
   * Handles the editing of words in the language table.
   *
   * @async
   * @function
   * @param {string} id - The ID of the word to be edited.
   * @param {Object} data - Updated word data.
   * @returns {Promise<void>} A Promise that resolves once the word is edited and state is updated.
   */
  const handleEditWords = async (id, data) => {
    try {
      console.log(data);
      await editData(`/api/languages/${language}/${id}`, data);
      const newData = await fetchData(`/api/languages/${language}`);
      if (language === "english") {
        setEngData(newData);
      } else if (language === "swedish") {
        setSwedishData(newData);
      } else if (language === "korean") {
        setKoreanData(newData);
      }

      setTableLang(newData);
    } catch (error) {
      console.log("Error while editin words");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: [1],
            }}
          >
            <Button variant="contained" onClick={handleLogOut}>
              LOG OUT
            </Button>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <List component="nav">
            <Button
              sx={{ p: 2 }}
              variant="text"
              onClick={() => handleLoadTable(engData, "english")}
            >
              English
            </Button>

            <Divider sx={{ my: 1 }} />

            <Button
              sx={{ p: 2 }}
              variant="text"
              onClick={() => handleLoadTable(swedishData, "swedish")}
            >
              Swedish
            </Button>

            <Divider sx={{ my: 1 }} />

            <Button
              sx={{ p: 2 }}
              variant="text"
              onClick={() => handleLoadTable(koreanData, "korean")}
            >
              Korean
            </Button>

            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid
              container
              sx={{ display: "flex", flexDirection: "column" }}
              spacing={3}
            >
              {/* The table */}
              <Grid item xs={12}>
                {tableLang.length > 0 && (
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      minHeight: 600,
                    }}
                  >
                    <LanguageTable
                      tableLang={tableLang}
                      onUpdateTableLang={handleAddNewWords}
                      onDeleteTableLang={handleDeleteWords}
                      onEditTableLang={handleEditWords}
                    />
                  </Paper>
                )}
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
