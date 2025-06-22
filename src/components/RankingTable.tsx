import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  Box
} from '@mui/material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface RankingTableProps {
  selectedMetric: string;
}

type Order = 'asc' | 'desc';

const RankingTable: React.FC<RankingTableProps> = ({ selectedMetric }) => {
  const [order, setOrder] = useState<Order>('desc');

  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const sortedData = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        cityId: data.cityId,
        cityName: cityInfo ? cityInfo.name : data.cityId,
        state: cityInfo ? cityInfo.state : '',
        value: data.metrics[selectedMetric] || 0
      };
    })
    .sort((a, b) => {
      if (order === 'asc') {
        return a.value - b.value;
      }
      return b.value - a.value;
    });

  const metric = METRICS.find(m => m.id === selectedMetric);

  if (!selectedMetric) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          City Rankings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a metric to view city rankings
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        City Rankings: {metric?.name}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={order}
                  onClick={handleSort}
                >
                  Value ({metric?.unit})
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={row.cityId}>
                <TableCell>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontWeight: index < 3 ? 'bold' : 'normal',
                    color: index === 0 ? '#FFD700' : 
                           index === 1 ? '#C0C0C0' : 
                           index === 2 ? '#CD7F32' : 'inherit'
                  }}>
                    {index + 1}
                  </Box>
                </TableCell>
                <TableCell>{row.cityName}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.value.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RankingTable; 