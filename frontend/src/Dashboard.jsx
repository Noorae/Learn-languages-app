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
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchData } from "./Api.jsx";
import Quiz from "./Quiz.jsx";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

/**
 * Dashboard component for the Application.
 *
 * @component
 * @returns {JSX.Element} The JSX Dashboard component.
 */
export default function Dashboard() {
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
   * State variable for chosen quiz data.
   * @type {Array}
   */
  const [quiz, setQuiz] = useState([]);
  /**
   * State variable for chosen quiz language data.
   * @type {string}
   */
  const [quizLang, setQuizLang] = useState("fi");
  /**
   * State variable for toggle quiz lang data.
   * @type {boolean}
   */
  const [checked, setChecked] = useState(true);
  /**
   * State variable for storing the user quiz score data.
   * @type {number}
   */
  const [score, setScore] = useState([]);
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
   * Loads the quiz based on selected language data and tag.
   *
   * @function
   * @param {Array} langData - Array of language data.
   * @param {string} tag - Tag of the language data or "allWords".
   * @returns {void}
   */
  const handleLoadQuiz = (langData, tag) => {
    if (tag === "allWords") {
      setQuiz(langData);
    } else {
      setQuiz((prevQuiz) => {
        return langData.filter((word) => word.tag === tag);
      });
    }
  };

  /**
   * Handles the switch toggle to switch between words and translations.
   *
   * @function
   * @param {Object} event - The switch toggle event.
   * @property {boolean} isChecked - True if switch toggle is set to true.
   * @property {string} newLang - Sets the correct language based on toggle switch.
   * @returns {void}
   */
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);

    const newLang = isChecked ? "fi" : "foreign_language";
    setting(newLang, () => console.log(quizLang));
  };

  /**
   * Sets the language for the quiz and does a callback.
   *
   * @function
   * @param {string} language - The language to set for the quiz.
   * @param {Function} callback - The helper callback function to execute after setting the language.
   * @returns {void}
   */
  function setting(language, callback) {
    setQuizLang(language);
    callback();
  }

  /**
   * Handles the user score in the quiz.
   *
   * @function
   * @param {number} score - The user score in the quiz.
   * @returns {void}
   */
  const handleScoreUpdate = (score) => {
    setScore(score);
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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>English</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <Button
                      onClick={() => handleLoadQuiz(engData, "allWords")}
                      variant="text"
                    >
                      All words
                    </Button>
                  </ListItem>
                  {engTags &&
                    engTags.map((tag) => (
                      <ListItem key={tag}>
                        <Button
                          onClick={() => handleLoadQuiz(engData, tag)}
                          variant="text"
                        >
                          {tag}
                        </Button>
                      </ListItem>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Divider sx={{ my: 1 }} />
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Swedish</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <Button
                      onClick={() => handleLoadQuiz(swedishData, "allWords")}
                      variant="text"
                    >
                      All words
                    </Button>
                  </ListItem>
                  {swedishTags &&
                    swedishTags.map((tag) => (
                      <ListItem key={tag}>
                        <Button
                          onClick={() => handleLoadQuiz(swedishData, tag)}
                          variant="text"
                        >
                          {tag}
                        </Button>
                      </ListItem>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Divider sx={{ my: 1 }} />
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Korean</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <Button
                      onClick={() => handleLoadQuiz(koreanData, "allWords")}
                      variant="text"
                    >
                      All words
                    </Button>
                  </ListItem>
                  {koreanTags &&
                    koreanTags.map((tag) => (
                      <ListItem key={tag}>
                        <Button
                          onClick={() => handleLoadQuiz(koreanData, tag)}
                          variant="text"
                        >
                          {tag}
                        </Button>
                      </ListItem>
                    ))}
                </List>
              </AccordionDetails>
            </Accordion>
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
            <Grid container spacing={3}>
              {/* Switch language toggle */}
              <Grid item xs={12} md={6} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="bottom"
                    control={
                      <Switch
                        sx={{
                          transform: "scale(1.5)",
                        }}
                        checked={checked}
                        onChange={handleChange}
                        color="secondary"
                      />
                    }
                    label="Switch the language"
                    labelPlacement="top"
                  />
                  <Typography sx={{ textAlign: "center" }}>
                    FI to Eng
                  </Typography>
                </Paper>
              </Grid>
              {/* Scores */}
              <Grid item xs={12} md={6} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {score !== null ? (
                    <Typography sx={{ textAlign: "center" }}>
                      You scored: {score} points
                    </Typography>
                  ) : null}
                </Paper>
              </Grid>
              {/* The quiz */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {" "}
                  <Quiz
                    quiz={quiz}
                    toggleQuizLang={quizLang}
                    onScoreUpdate={handleScoreUpdate}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
