
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function Loading() {

  return (
  
      <Backdrop
        sx={{ color: '#fff', zIndex: 99999 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
   
  );
}