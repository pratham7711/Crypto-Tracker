import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../store/CryptoContext';
import { Avatar } from '@mui/material';

export default function SideBar() {
  const [state, setState] = React.useState({
    right: false,
  });
  
  const {user} = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor,true)}
          sx={{height:38 ,  width : 38  , cursor : "pointer" , backgroundColor : "aliceblue"}}
          src ={user.photoUrl}
          alt ={user.displayName || user.email}
          > </Avatar>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
