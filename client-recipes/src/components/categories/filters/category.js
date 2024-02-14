import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function Category({ categoryId }) {
  const [category, setCategory] = React.useState();

  const categories=useSelector(state => state.categories);

  const handleChange = (event) => {
    setCategory(event.target.value);
    categoryId(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Category</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={category}
        label="Categories"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categories.map((c, i) =>
          <MenuItem key={i} value={c.Id}>{c.Name}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}