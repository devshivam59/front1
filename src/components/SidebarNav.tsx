import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarNavProps {
  items: NavItem[];
  basePath: string;
}

const SidebarNav = ({ items, basePath }: SidebarNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List sx={{ px: 1 }}>
      {items.map((item) => {
        const isActive = location.pathname === item.path || location.pathname === `${basePath}${item.path}`;
        return (
          <ListItemButton
            key={item.label}
            selected={isActive}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: 'rgba(255,255,255,0.8)',
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, rgba(56,182,255,0.25), rgba(100,255,218,0.15))',
                color: '#fff'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default SidebarNav;
