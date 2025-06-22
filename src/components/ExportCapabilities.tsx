import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Download,
  PictureAsPdf,
  Share,
  TableChart,
  Image
} from '@mui/icons-material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface ExportCapabilitiesProps {
  selectedCities: string[];
  selectedMetrics: string[];
}

const ExportCapabilities: React.FC<ExportCapabilitiesProps> = ({ 
  selectedCities, 
  selectedMetrics 
}) => {
  const [reportTitle, setReportTitle] = useState('India Growth Dashboard Report');
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('csv');
  const [message, setMessage] = useState('');

  // Export data as CSV
  const exportToCSV = () => {
    setIsExporting(true);
    
    const headers = ['City', 'State', ...selectedMetrics.map(id => {
      const metric = METRICS.find(m => m.id === id);
      return metric ? metric.name : id;
    })];
    
    const csvData = selectedCities.map(cityId => {
      const cityInfo = CITIES.find(c => c.cityId === cityId);
      const cityData = MOCK_DATA.find(d => d.cityId === cityId);
      
      const row = [
        cityInfo?.name || cityId,
        cityInfo?.state || '',
        ...selectedMetrics.map(metricId => cityData?.metrics[metricId] || 0)
      ];
      
      return row.join(',');
    });
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `india_growth_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    setMessage('CSV file downloaded successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Export data as Excel (simulated)
  const exportToExcel = () => {
    setIsExporting(true);
    
    // Simulate Excel export (in a real app, you'd use a library like xlsx)
    setTimeout(() => {
      setIsExporting(false);
      setMessage('Excel export would be implemented with xlsx library');
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  // Generate PDF report
  const generatePDFReport = () => {
    setIsExporting(true);
    
    // Simulate PDF generation (in a real app, you'd use a library like jsPDF)
    setTimeout(() => {
      setIsExporting(false);
      setMessage('PDF report generation would be implemented with jsPDF library');
      setTimeout(() => setMessage(''), 3000);
    }, 3000);
  };

  // Share visualization as image
  const shareAsImage = () => {
    setIsExporting(true);
    
    // Simulate image export (in a real app, you'd use html2canvas)
    setTimeout(() => {
      setIsExporting(false);
      setMessage('Image export would be implemented with html2canvas library');
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  // Generate comprehensive report
  const generateComprehensiveReport = () => {
    setIsExporting(true);
    
    const reportData = {
      title: reportTitle,
      generatedAt: new Date().toISOString(),
      cities: selectedCities.map(cityId => {
        const cityInfo = CITIES.find(c => c.cityId === cityId);
        return cityInfo ? `${cityInfo.name}, ${cityInfo.state}` : cityId;
      }),
      metrics: selectedMetrics.map(metricId => {
        const metric = METRICS.find(m => m.id === metricId);
        return metric ? metric.name : metricId;
      }),
      data: selectedCities.map(cityId => {
        const cityInfo = CITIES.find(c => c.cityId === cityId);
        const cityData = MOCK_DATA.find(d => d.cityId === cityId);
        return {
          city: cityInfo?.name || cityId,
          state: cityInfo?.state || '',
          metrics: selectedMetrics.reduce((acc, metricId) => {
            acc[metricId] = cityData?.metrics[metricId] || 0;
            return acc;
          }, {} as { [key: string]: number })
        };
      })
    };
    
    // Simulate comprehensive report generation
    setTimeout(() => {
      setIsExporting(false);
      setMessage('Comprehensive report generated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 4000);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Export Capabilities
      </Typography>
      
      {isExporting && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Generating export...
          </Typography>
        </Box>
      )}
      
      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* Data Export */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TableChart sx={{ mr: 1 }} />
                Data Export
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={exportType}
                  label="Export Format"
                  onChange={(e) => setExportType(e.target.value)}
                >
                  <MenuItem value="csv">CSV</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={exportType === 'csv' ? exportToCSV : exportToExcel}
                disabled={isExporting || selectedCities.length === 0 || selectedMetrics.length === 0}
                fullWidth
                sx={{ mb: 1 }}
              >
                Export Data
              </Button>
              
              <Typography variant="caption" color="text.secondary">
                Export {selectedCities.length} cities × {selectedMetrics.length} metrics
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* PDF Report */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PictureAsPdf sx={{ mr: 1 }} />
                PDF Report
              </Typography>
              
              <TextField
                fullWidth
                label="Report Title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Button
                variant="contained"
                startIcon={<PictureAsPdf />}
                onClick={generatePDFReport}
                disabled={isExporting}
                fullWidth
                sx={{ mb: 1 }}
              >
                Generate PDF Report
              </Button>
              
              <Typography variant="caption" color="text.secondary">
                Comprehensive report with charts and insights
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Image Export */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Image sx={{ mr: 1 }} />
                Share Visualizations
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<Share />}
                onClick={shareAsImage}
                disabled={isExporting}
                fullWidth
                sx={{ mb: 1 }}
              >
                Export as Image
              </Button>
              
              <Typography variant="caption" color="text.secondary">
                Share charts and visualizations as PNG/JPG
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Comprehensive Report */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TableChart sx={{ mr: 1 }} />
                Comprehensive Report
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={generateComprehensiveReport}
                disabled={isExporting}
                fullWidth
                sx={{ mb: 1 }}
              >
                Generate Full Report
              </Button>
              
              <Typography variant="caption" color="text.secondary">
                Complete analysis with recommendations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Export Summary */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Export Summary:</strong> Ready to export data for {selectedCities.length} cities and {selectedMetrics.length} metrics. 
          {selectedCities.length === 0 && ' Please select cities to export.'}
          {selectedMetrics.length === 0 && ' Please select metrics to export.'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ExportCapabilities; 