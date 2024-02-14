import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterDifficulty({ difficulty }) {
  const [filterDifficulty, setFilterDifficulty] = React.useState();

  const handleChange = (event) => {
    setFilterDifficulty(event.target.value);
    difficulty(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Difficulty</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filterDifficulty}
        label="Difficulty"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
          <MenuItem value={1}>{"Easy"}</MenuItem>
          <MenuItem value={2}>{"Medium"}</MenuItem>
          <MenuItem value={3}>{"Hard"}</MenuItem>
      </Select>
    </FormControl>
  );
}