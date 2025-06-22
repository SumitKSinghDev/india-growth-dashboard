import React from 'react';
import { 
  Autocomplete, 
  TextField, 
  Chip,
  Typography,
  Paper
} from '@mui/material';
import { CITIES } from '../data/mockData';

interface CitySelectorProps {
  selectedCities: string[];
  onCitiesChange: (cities: string[]) => void;
  searchTerm?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCities,
  onCitiesChange,
  searchTerm = ''
}) => {
  const filteredCities = CITIES.filter(city =>
    !searchTerm ||
    city.name.toLowerCase().includes(searchTerm) ||
    city.state.toLowerCase().includes(searchTerm)
  );

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select Cities
      </Typography>
      <Autocomplete
        multiple
        value={CITIES.filter(city => selectedCities.includes(city.cityId))}
        onChange={(_, newValue) => onCitiesChange(newValue.map(city => city.cityId))}
        options={filteredCities}
        getOptionLabel={(option) => `${option.name}, ${option.state}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cities"
            placeholder="Select cities to compare"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={`${option.name}, ${option.state}`}
              {...getTagProps({ index })}
            />
          ))
        }
        renderOption={(props, option) => (
          <li {...props}>
            <div>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {option.state}
              </Typography>
            </div>
          </li>
        )}
      />
    </Paper>
  );
};

export default CitySelector; 