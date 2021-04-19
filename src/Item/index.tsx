import Button from '@material-ui/core/Button';

import {CartItemType} from '../App';

import {Wrapper} from './styles';

type Props = {
  item: CartItemType;
  handleAdd: (clickedItem:CartItemType) => void;
}

const Item: React.FC <Props> = ({item, handleAdd}) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAdd(item)}>Adicionar</Button>
  </Wrapper>
)

export default Item;