import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@apollo/client';
import {PROJECT_LIST_QUERY} from '../apollo/query/Listquery'
import { DELETE_PROJECT } from '../apollo/mutation/deleteProject';

  
export default function CustomDeleteButton({id}: {id: string}) {
  const [open, setOpen] = React.useState(false);

  const handleDisagree = () => {
    setOpen(false)
  }
    const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      PROJECT_LIST_QUERY,
      'ProjectListQuery'
    ],
  })
  const handleAgree = (id: string)=> {
    setOpen(false)
    deleteProject({ variables: {
      "input": {
        "id": id
        }
      }
    })
  }
  
  return (
    <div>
      <Button onClick={()=> {setOpen(true)}} variant="outlined" color="error">Delete</Button>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Project deletion confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete that project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={() => handleAgree(id)}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
