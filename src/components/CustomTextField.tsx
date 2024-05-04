import React from 'react'
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../apollo/mutation/updateProject';
import { PROJECT_LIST_QUERY } from '../apollo/query/Listquery';

const CustomTextField = ({value, id}: {value: string, id: string}) => {
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [
      PROJECT_LIST_QUERY,
      'ProjectListQuery'
    ],
  })
  const [name, setName] = React.useState(value)
  const handleEnter = (e: React.KeyboardEvent) => {
      if(e.key === 'Enter') {
        updateProject({
          variables: {
            "input": {
              "id": id,
              "name": name,
            }
          }
        })
        setInputBox(false)
      }
  }
    const [inputBox, setInputBox] = useState(false)
    const field = useRef<any>(null)
  return (
    <TableCell onClick={() => {setInputBox(true)}} component="th" scope="row" ref={field} id={id}>
    {
        (inputBox === true && field.current.id == id) ? <TextField onKeyDown={(e) => handleEnter(e)} onChange={(e)=> setName(e.target.value)} id="outlined-basic" defaultValue={name == null ? "" : name} variant="outlined" /> :  name
    }
    
    </TableCell>
  )
}

export default CustomTextField