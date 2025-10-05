import { Box, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <Box
    sx={{
      p: 3,
      borderRadius: 3,
      background: 'linear-gradient(145deg, rgba(23,32,56,0.9), rgba(15,23,42,0.9))',
      border: '1px solid rgba(56,182,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        background: 'rgba(56,182,255,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'primary.main'
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
        {value}
      </Typography>
      {change && (
        <Typography variant="caption" color={change.startsWith('-') ? 'error.light' : 'secondary.light'}>
          {change}
        </Typography>
      )}
    </Box>
  </Box>
);

export default StatCard;
