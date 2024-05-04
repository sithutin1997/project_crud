import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from "@apollo/client";
import CustomTextField from './CustomTextField';
import {PROJECT_LIST_QUERY} from '../apollo/query/Listquery'
import {ProjectData} from '../types/project'
import CustomDeleteButton from './CustomDeleteButton';

export default function BasicTable() {

  /**
   * Fetching project list using useQuery
   */
  const { data, loading, error } = useQuery<ProjectData>(PROJECT_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error.message}</pre>


  return (
    <div>
      <TableContainer component={Paper}>
        <Table 
        sx={{ minWidth: 650}} 
        aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.listProjects.items.map((project) => (
              <TableRow
                key={project.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              >
                <CustomTextField value={project.name} id={project.id}/>
                <TableCell>{project.description}</TableCell>
                <TableCell><CustomDeleteButton id={project.id} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
