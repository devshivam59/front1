import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { approveUser, blockUser, getUsers, unblockUser } from '../../api/admin';
import type { User } from '../../types';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = () => {
    setLoading(true);
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    await approveUser(userId);
    loadUsers();
  };

  const handleBlock = async (userId: string, block: boolean) => {
    if (block) {
      await blockUser(userId);
    } else {
      await unblockUser(userId);
    }
    loadUsers();
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          User management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Approve onboarding requests, manage access, and control operational risk.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {user.roles.map((role) => (
                        <Chip key={role} label={role} color={role === 'admin' ? 'secondary' : 'default'} />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.approved ? 'Approved' : 'Pending'}
                      color={user.approved ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {!user.approved && (
                        <Button size="small" variant="contained" onClick={() => handleApprove(user.id)}>
                          Approve
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        color={user.isBlocked ? 'success' : 'error'}
                        onClick={() => handleBlock(user.id, !user.isBlocked)}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {!users.length && !loading && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                      No users yet. Onboard clients from the main registration flow.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminUsersPage;
