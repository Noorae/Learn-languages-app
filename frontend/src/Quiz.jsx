import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";

const Quiz = ({ quiz, toggleQuizLang, onScoreUpdate }) => {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.forEach((wordPair, index) => {
      const userAnswer = userAnswers[index].toLowerCase();
      console.log("toggleQuizLang value:", toggleQuizLang);
      const correctAnswerField =
        toggleQuizLang === "fi" ? "foreign_language" : toggleQuizLang;
      console.log(correctAnswerField);

      const correctAnswer = wordPair[correctAnswerField]?.toLowerCase();

      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    onScoreUpdate(score);
    setUserAnswers([]);
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
