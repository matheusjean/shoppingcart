import { useState } from 'react';
import { useQuery } from 'react-query';

import Item from './Item';
import Cart from './Cart/index';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Wrapper, Button } from './appstyles';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = ()=> {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>();
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAdd = (clickedItem:CartItemType) => {
    setCartItems(prev => {
      const inCart = prev.find(item => item.id === clickedItem.id)

      if(inCart) {
        return prev.map(item =>
          item.id === clickedItem.id ? {...item, amount: item.amount +1}
          : item
        )
      }

      return [...prev, {...clickedItem, amount: 1}];
    });
  };

  const handleRemove = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount -1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    )
  };

  if(isLoading) return <LinearProgress />;
  if(error) return <div>Algo deu errado...</div>

  return (
    <Wrapper>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems}
      addToCart={handleAdd}
      removeFromCart={handleRemove}
      />
      </Drawer>
      <Button onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </Button>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAdd={handleAdd} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
