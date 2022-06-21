import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from '../../store/store';
import { getCompanies, getSelectedCompany, selectCompany } from '../../store/jobSlice';

export default function MUISelect() {
  const companies = useSelector(getCompanies);
  const selectedCompany = useSelector(getSelectedCompany);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(selectCompany(event.target.value))
  };
  return (
    <Box sx={{ minWidth: 120 }} style={{width: '60%'}}>
      {companies && <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Companies</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCompany}
          label="Companies"
          onChange={handleChange}
        >
          {companies && ["All",...companies].map((company: string, index: number)=> {
            return(
              <MenuItem key={index} value={company}>{company}</MenuItem>
            )
          })}
        </Select>
      </FormControl>}
    </Box>
  );
};