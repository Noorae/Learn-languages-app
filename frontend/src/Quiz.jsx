import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Quiz component renders a quiz based on the provided word pairs.
 * Users can input their answers, and component submits the quiz.
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.quiz - The array of word pairs for the quiz.
 * @param {string} props.toggleQuizLang - The language field to toggle for the quiz.
 * @param {Function} props.onScoreUpdate - Callback function to handle the quiz score update.
 * @returns {React.ReactNode} The Quiz component.
 */
const Quiz = ({ quiz, toggleQuizLang, onScoreUpdate }) => {
  /**
   * State to store user answers for each quiz question.
   * @type {Array<string>}
   */
  const [userAnswers, setUserAnswers] = useState([]);

  /**
   * Handles the change in user answer for a specific quiz question.
   * @param {number} index - The index of the quiz question.
   * @param {string} value - The user's answer for the quiz question.
   */
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  /**
   * Handles quiz submission, calculates the score, and updates the parent component.
   * @function
   * @property {number} score - Users quiz score.
   * @returns {void}
   */
  const handleSubmit = () => {
    console.log(quiz);
    let score = 0;
    const currentToggleQuizLang = toggleQuizLang;
    console.log("Current toggleQuizLang value:", currentToggleQuizLang);

    quiz.forEach((wordPair, index) => {
      const userAnswer = userAnswers[index].toLowerCase();
      console.log("toggleQuizLang value during loop:", currentToggleQuizLang);

      const correctAnswerField =
        currentToggleQuizLang === "fi" ? "foreign_language" : "fi";

      console.log("correctAnswerField:", correctAnswerField);

      const correctAnswer = wordPair[correctAnswerField]?.toLowerCase();

      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    onScoreUpdate(score);
    setUserAnswers([]); // reset user answers after submission
  };

  return (
    <Paper>
      <Grid
        container
        spacing={3}
        sx={{
          p: 2, // padding
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {quiz &&
          quiz.map((wordPair, index) => (
            <Grid
              container
              sx={{
                p: 2, // padding
                display: "flex",
                flexDirection: "column",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              {" "}
              <Grid item xs={12} md={6} lg={9}>
                <Typography>{wordPair[toggleQuizLang]}</Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={9}>
                <TextField
                  id="outlined-basic"
                  label="Guess word"
                  variant="outlined"
                  value={userAnswers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
        <Button
          onClick={handleSubmit}
          sx={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
            marginBottom: 1,
          }}
          variant="contained"
        >
          Submit quiz
        </Button>
      </Grid>
    </Paper>
  );
};

export default Quiz;
