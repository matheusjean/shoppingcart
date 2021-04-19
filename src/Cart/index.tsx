import CartItem from '../CartItem/index';

import {Wrapper} from './styles';

import {CartItemType} from '../App';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
  const calcTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0)

  return (
    <Wrapper>
      <h2>Seu carrinho</h2>
      {cartItems.length === 0? <p>Sem itens no carrinho</p>: null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: R${calcTotal(cartItems). toFixed(2)}</h2>
    </Wrapper>
  )
}

export default Cart;