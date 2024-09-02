'use client'

import {Box, Typography, Button, Modal, TextField, Stack, Container, Paper } from '@mui/material'
import RecipeSuggestions from '@/app/recipeSuggestions';
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
  color:"#967969",
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap: 3,
  justifyContent:'center',

};

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [open, setOpen] = useState(false) 
  const handleOpen = () => setOpen(true) 
  const handleClose = () => setOpen(false)

  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
    setFilteredInventory(inventoryList);

  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  useEffect(() => {
    // Filter inventory based on search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = inventory.filter(({ name }) =>
      name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventory]);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }


  return (
    <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    color="#967969"
    gap={2}
  >
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
          <Button
            variant="contained"
            sx={{ bgcolor: '#967969', '&:hover': { bgcolor: '#785a4e' } }}
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
          >Add</Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="contained"  
    sx={{ bgcolor: '#967969', '&:hover': { bgcolor: '#785a4e' } }}
    onClick={handleOpen}>
      Add New Item
    </Button>
    <TextField
        id="search-bar"
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2, width: '800px' }}
      />


    <Box border={'1px solid #333'}>
      <Box
        width="800px"
        height="100px"
        bgcolor={'#967969'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Inventory Items
        </Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
        {filteredInventory.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
            paddingX={5}
          >
            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
              Quantity: {quantity}
            </Typography>
            <Button variant="contained" 
            sx={{ bgcolor: '#967969', '&:hover': { bgcolor: '#785a4e' } }}
            onClick={() => addItem(name)}>
              +1
            </Button>
            <Button variant="contained" 
            sx={{ bgcolor: '#967969', '&:hover': { bgcolor: '#785a4e' } }}
            onClick={() => removeItem(name)}>
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>

    {/* Recipe Suggestions Box */}
    <Box border={'1px solid #333'} marginTop={4}>
        <Box
          width="500px"
          height="50px"
          bgcolor={'#967969'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
            Recipe Suggestions
          </Typography>
        </Box>
        <Stack width="500px" height="100px" spacing={2} overflow={'auto'}>
          <RecipeSuggestions inventory={inventory} />
        </Stack>
      </Box>

  </Box>
  
);
}