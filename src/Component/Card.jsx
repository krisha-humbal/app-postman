import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function BasicCard({heading,count}) {
  return (
    <Card sx={{ width:'calc(33.33% - 20px)' }}>
      <CardContent>
       
        <Typography variant="h5" component="div" sx={{textAlign:'center'}}>
          {heading}
        </Typography>

        <Typography variant="body2">
          {count}
          <br />
     
        </Typography>
      </CardContent>
     
    </Card>
  );
}
