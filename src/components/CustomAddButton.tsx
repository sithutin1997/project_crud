import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../apollo/mutation/createProject';
import { PROJECT_LIST_QUERY } from '../apollo/query/Listquery';

export default function CustomAddButton() {
  const [open, setOpen] = React.useState(false);
  const [nameError, setNameError] = React.useState(false)
  const [descriptionError, setDescriptionError] = React.useState(false)

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      PROJECT_LIST_QUERY,
      'ProjectListQuery'
    ],
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
        setDescriptionError(false);
    } else {
        setDescriptionError(true);
    }
  };

  const handleClose = () => {
    setDescriptionError(false);
    setNameError(false);
    setOpen(false);
  };

  const handleSubmit = (name: string, description: string)=> {
    createProject({ variables: {
        "input": {
            "name": name,
            "description": description
            }
        }
    })
    setOpen(false)
    setDescriptionError(false);
    setNameError(false);
  }

  return (
    <div style={{marginBottom: "20px"}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const name = formJson.name;
            const description = formJson.description;
            handleSubmit(name, description);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
           To create a new project, please fill out the form.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
            error={nameError}
            helperText={
              nameError ? "Please enter project name" : ""
            }
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />
          <TextField
            required
            onChange={handleDescriptionChange}
            error={descriptionError}
            helperText={
              nameError ? "Please enter project description" : ""
            }
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
