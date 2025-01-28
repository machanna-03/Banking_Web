import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
export const Dashboard = () => {
  return (
<AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 3 }}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}
        >
          Welcome to Dashboard
        </Typography>
      </Toolbar>
    </AppBar>  )
}
