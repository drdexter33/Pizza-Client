import { useState, useEffect } from 'react';
import PizzaList from './PizzaList';

const term = "Pizza";
//localhost mock endpoint - .Net Core app runs in Visual Studio (dotnet run ps terminal)
const API_URL = '/pizzas';

//endpoint in Azure Resource
//const API_URL = 'https://pizzastore20240411114304.azurewebsites.net/pizzas';
const headers = {
  'Content-Type': 'application/json',
};


function Pizza() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  //const [maxId, setMaxId] = useState(0);

  //useEffect hook used to set data on initial page request via fetchPizzaData -> fetch API
  useEffect(() => {
    fetchPizzaData();
  }, []);

  //fetch data
  const fetchPizzaData = () => {
  
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error));
  
    //
    // Simulate fetching data from API
    // const pizzaData = [
    //   { id: 1, name: 'Margherita', description: 'Tomato sauce, mozzarella, and basil' },
    //   { id: 2, name: 'Pepperoni', description: 'Tomato sauce, mozzarella, and pepperoni' },
    //   { id: 3, name: 'Hawaiian', description: 'Tomato sauce, mozzarella, ham, and pineapple' },
    // ];
    // setData(pizzaData);
    // setMaxId(Math.max(...pizzaData.map(pizza => pizza.id)));
  };

  //--------------------------------------------------------
  // handleCreate: Creates new pizza item
  //--------------------------------------------------------
  const handleCreate = (item) => {

    console.log(`add item: ${JSON.stringify(item)}`)

    fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({name: item.name, description: item.description}),
    })
      .then(response => response.json())
      .then(returnedItem => setData([...data, returnedItem]))
      .catch(error => setError(error));
  };


    // // Simulate creating item on API
    // const newItem = { ...item, id: data.length + 1 };
    // setData([...data, newItem]);
    // setMaxId(maxId + 1);
  

  
  //--------------------------------------------------------
  // handleUpdate: Updates pizza item
  //--------------------------------------------------------
  const handleUpdate = (updatedItem) => {
    
    console.log(`update item logged in debug console: ${JSON.stringify(updatedItem)}`)

    fetch(`${API_URL}/${updatedItem.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updatedItem),
    })
      .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
      .catch(error => setError(error));

    // // Simulate updating item on API
    // const updatedData = data.map(pizza => pizza.id === item.id ? item : pizza);
    // setData(updatedData);
  };


  //--------------------------------------------------------
  // handleDelete: Updates pizza item
  //--------------------------------------------------------
  const handleDelete = (id) => {

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(() => setData(data.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting item:', error));

    // // Simulate deleting item on API
    // const updatedData = data.filter(pizza => pizza.id !== id);
    // setData(updatedData);
  };

//Return PizzaList component 
  return (
    <div>
      <PizzaList
        name={term}
        data={data}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Pizza;