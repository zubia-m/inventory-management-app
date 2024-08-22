'use client'

import { AppBar, Box, Toolbar, Typography, Button, Modal, TextField, Stack, Container, Paper } from '@mui/material'
import Link from 'next/link';
import { firestore } from '@/firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false) 
  const handleOpen = () => setOpen(true) 
  const handleClose = () => setOpen(false)

  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    });
    setPantry(pantryList)
  };

  useEffect(() => {   
    updatePantry();
  }, [])

  const addItem = async (item) => {
    const collectionRef = collection(firestore, 'pantry');
    const docId = item.trim() ? item : `empty_${Date.now()}`;
    
    const docRef = doc(collectionRef, docId);
    await setDoc(docRef, { name: item || "Unnamed Item" });
    updatePantry();
  };
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    await deleteDoc(docRef)
    updatePantry()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{ 
        backgroundImage: 'url(/images/pantry-background.jpg)',  // Add your background image
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
      }}
    >

      <Container maxWidth="md">
        <Box 
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={5}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Item
          </Button> 
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Item
              </Typography>
              <Stack width="100%" direction={'row'} spacing={2}>
                <TextField 
                  id="outlined-basic" 
                  label="Item" 
                  variant="outlined" 
                  fullWidth 
                  value={itemName} 
                  onChange={(e) => setItemName(e.target.value)}
                />
                <Button variant="contained" color="primary"
                  onClick={() => {
                    addItem(itemName)
                    setItemName('')
                    handleClose()
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Modal>

          <Paper sx={{ width: '100%', mt: 3, p: 2 }}>
            <Box
              bgcolor="#e3f2fd"
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
              borderRadius={1}
            >
              <Typography variant="h4" color="#333">
                Pantry Items
              </Typography>
            </Box>

            <Stack spacing={2} mt={3}>
              {pantry.map((i) => (
                <Box 
                  key={i} 
                  p={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor={'#ffffff'}
                  borderRadius={1}
                  boxShadow={2}
                >
                  <Typography variant="h6" color="#333">
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                  </Typography>
                  <Button variant="outlined" color="secondary" onClick={() => removeItem(i)}>
                    Remove
                  </Button>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
