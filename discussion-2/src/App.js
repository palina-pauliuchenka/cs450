import './App.css';

import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Plot from 'react-plotly.js';

const App = () => {
  const [data, setData] = useState([]);
  const [plotType, setPlotType] = useState('scatter'); 

  const addDataPoint = () => {
    const newPoint = Math.floor(Math.random() * 100);
    setData([...data, newPoint]);
  };

  const handlePlotTypeChange = (event) => {
    setPlotType(event.target.value);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Plot Dashboard
          </Typography>
          
          {/* Dropdown for selecting plot type */}
          <FormControl variant="outlined" style={{ marginLeft: '20px', minWidth: 120, padding: '16px 0' }}>
            <InputLabel 
              id="plot-type-label" 
              sx={{ 
                  color: 'white', 
                  padding: '22px 0',
                }} 
              shrink={true}>Select Plot Type</InputLabel>
            <Select
              labelId="plot-type-label"
              value={plotType}
              onChange={handlePlotTypeChange}
              label="Select Plot Type"
              sx={{
                backgroundColor: 'transparent', 
                color: 'white', 
                '& .MuiSelect-select': {
                  color: 'white', 
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                  borderWidth: '1px',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                },
                '& .MuiMenuItem-root': {
                  color: 'black', 
                  backgroundColor: 'white',
                },
              }}
            >
              <MenuItem value="scatter">Scatter Plot</MenuItem>
              <MenuItem value="violin">Violin Plot</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Grid container spacing={4}>
        {/* Conditional rendering based on selected plot type */}
        <Grid item xs={12} md={6}>
          {plotType === 'scatter' && (
            <Plot
              data={[
                {
                  x: data.map((_, index) => index + 1),
                  y: data,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'blue' },
                  name: 'Data Points',
                },
              ]}
              layout={{ width: 720, height: 440, title: 'Scatter Plot' }}
            />
          )}
          {plotType === 'violin' && (
            <Plot
              data={[
                {
                  y: data,
                  type: 'violin',
                  box: { visible: true },
                  line: { color: 'purple' },
                  meanline: { visible: true },
                  name: 'Data Distribution',
                },
              ]}
              layout={{ width: 720, height: 440, title: 'Violin Plot' }}
            />
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={addDataPoint}>
            Add Random Data Point
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
