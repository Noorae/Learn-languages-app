import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, TextField } from "@mui/material";

const Quiz = ({ quiz, toggleQuizLang, onSubmitAnswers }) => {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);

    onSubmitAnswers(updatedAnswers);
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
      </Grid>
    </Paper>
  );
};

export default Quiz;
