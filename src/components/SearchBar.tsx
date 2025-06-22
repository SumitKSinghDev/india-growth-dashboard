import React from 'react';
import { Paper, TextField, InputAdornment, Box, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { METRICS } from '../data/metrics';
import { CITIES } from '../data/mockData';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search metrics or cities...' }) => {
  const theme = useTheme();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    onSearch(searchTerm);
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        p: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.1)' 
          : 'rgba(0,0,0,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          onChange={handleSearch}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.05)' 
                : 'rgba(255,255,255,0.8)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
              },
              '&.Mui-focused': {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 3px ${theme.palette.primary.main}30`,
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary,
              '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 0.7,
              },
            },
            '& .MuiInputAdornment-root': {
              color: theme.palette.text.secondary,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.primary.main }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  );
};

export default SearchBar; 