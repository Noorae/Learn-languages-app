import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function LanguageTable({
  tableLang,
  onUpdateTableLang,
  language,
  onDeleteTableLang,
  onEditTableLang,
}) {
  const [editItemId, setEditItemId] = useState(null);
  const [updatedTableLang, setUpdatedTableLang] = useState(tableLang);
  const [newWordPairData, setNewWordPairData] = useState({
    foreign_language: "",
    fi: "",
    tag: "",
  });

  const handleEdit = (id, editedValues) => {
    console.log(editedValues);
    onEditTableLang(id, editedValues);
  };

  const handleDelete = (id) => {
    console.log(id);

    onDeleteTableLang(id);
    //send id to parent for deletion
  };

  const handleSave = () => {
    //send local data to parent for database save
  };

  const handleAddNewWordPair = (event) => {
    event.preventDefault(); // prevent the form  default submission

    // extract data from the form fields
    const newWordPair = {
      foreign_language: event.target.foreign_language.value,
      fi: event.target.fi.value,
      tag: event.target.tag.value,
    };

    console.log(newWordPair);

    onUpdateTableLang(newWordPair);

    // send unewWordPair parent for database add
    // C´clear form fields
    setNewWordPairData({
      foreign_language: "",
      fi: "",
      tag: "",
    });
  };

  const columns = [
    {
      field: "foreign_language",
      headerName: "Language",
      width: 150,
      editable: true,
    },
    {
      field: "fi",
      headerName: "Translation",
      width: 150,
      editable: true,
    },
    {
      field: "tag",
      headerName: "tag",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            color="primary"
            onClick={() => handleEdit(params.row.id, params.row)}
            startIcon={<EditIcon />}
          >
            Submit Edit
          </Button>
          <Button
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Grid
        container
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        spacing={3}
      >
        <Grid item xs={12}>
          <DataGrid
            rows={tableLang}
            columns={columns}
            pageSize={10}
            pageSizeOptions={[]}
            disableRowSelectionOnClick
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mt: 2, display: "flex", flexDirection: "row" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <form onSubmit={handleAddNewWordPair}>
              <Grid container spacing={4} alignItems="center">
                <Grid item>
                  <TextField
                    id="foreign_language"
                    name="foreign_language"
                    label="word"
                    variant="standard"
                    sx={{ width: "150px" }}
                    value={newWordPairData.foreign_language}
                    onChange={(e) =>
                      setNewWordPairData({
                        ...newWordPairData,
                        foreign_language: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="fi"
                    name="fi"
                    label="translation"
                    variant="standard"
                    sx={{ width: "150px" }}
                    value={newWordPairData.fi}
                    onChange={(e) =>
                      setNewWordPairData({
                        ...newWordPairData,
                        fi: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="tag"
                    name="tag"
                    label="tag"
                    variant="standard"
                    sx={{ width: "150px" }}
                    value={newWordPairData.tag}
                    onChange={(e) =>
                      setNewWordPairData({
                        ...newWordPairData,
                        tag: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Add new
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
}
