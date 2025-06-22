import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material';
import { METRICS, MetricCategory } from '../data/metrics';

interface MetricSelectorProps {
  selectedMetric: string;
  selectedCategory: MetricCategory | 'All';
  onMetricChange: (metric: string) => void;
  onCategoryChange: (category: MetricCategory | 'All') => void;
  searchTerm?: string;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({
  selectedMetric,
  selectedCategory,
  onMetricChange,
  onCategoryChange,
  searchTerm = ''
}) => {
  const [filteredMetrics, setFilteredMetrics] = useState(METRICS);

  useEffect(() => {
    let filtered = METRICS;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(metric => metric.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(metric => 
        metric.name.toLowerCase().includes(searchTerm) ||
        metric.description.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredMetrics(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select Metric
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value as MetricCategory | 'All')}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Economic">Economic</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Environment">Environment</MenuItem>
              <MenuItem value="Governance">Governance</MenuItem>
              <MenuItem value="Equality">Equality</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            value={METRICS.find(m => m.id === selectedMetric) || null}
            onChange={(_, newValue) => onMetricChange(newValue?.id || '')}
            options={filteredMetrics}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Metric"
                placeholder="Select a metric"
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <div>
                  <Typography variant="body1">{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.description}
                  </Typography>
                </div>
              </li>
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MetricSelector; 