import { useState, useEffect } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

{/*
  ---------------------------------------------------------------------------
  Pizza List component renders a form to create and edit pizza items.
  Here we receive props from the parent Pizza.jsx component.
  ---------------------------------------------------------------------------
  This component uses useState and useEffect hooks to manage form data
  as well as editing state.
*/}

function PizzaList({ name, data, onCreate, onUpdate, onDelete, error }) {

  console.log(`PizzaList: ${JSON.stringify(data)}`);

  const [formData, setFormData] = useState({ id: '', name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  //useEffect - 
  useEffect(() => {
    if (editingId === null) {
      setFormData({ id: '', name: '', description: '' });
    } else {
      const currentItem = data.find(item => item.id === editingId);
      setFormData(currentItem);
    }
  }, [editingId, data]);

  //
  const handleFormChange = (event) => {

    console.log(`handleFormChange: ${event.target.name} ${event.target.value}`)

    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`formData: ${JSON.stringify(formData)}`)

    if (editingId !== null) {
      console.log(`update item: ${JSON.stringify(formData)}`)
      onUpdate(formData);
    } else {
      onCreate(formData);
    }

    setFormData({ id: '', name: '', description: '' });
    setEditingId(null);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setFormData({ id: '', name: '', description: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  {/*
    Returns form with two input fields for pizza name/description and two buttons to create/update pizza  
  */}
  return (
    <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{name}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} />
        <TextField label="Description" name="description" value={formData.description} onChange={handleFormChange} />
        <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
        {editingId !== null && <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>}
      </form>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {data.map(item => (
          <ListItem key={item.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
      {error && <p>{error}</p>}
    </Box>
  );
}

export default PizzaList;