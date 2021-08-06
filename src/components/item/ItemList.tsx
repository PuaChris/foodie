import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import Item from './Item';
import ItemModal from './ItemModal';
import ItemController from '../../helper/controller/itemController';

import styles from '../styles/item/ItemList.module.scss';
import { restListCache, IItem } from '../../constant';

// Declaring State interface
interface IProps {
  restId: string
}
interface IState {
  isModalOpen: boolean,
  selectedItem?: IItem,
  itemList: IItem[],
}

const style: any = styles;
class ItemList extends React.Component<IProps, IState> {
  private control: ItemController;

  constructor(props: IProps) {
    super(props);

    // Initialize API controller
    this.control = new ItemController();

    this.state = {
      isModalOpen: false,
      selectedItem: undefined,
      itemList: [],
    };

    this.closeModal = this.closeModal.bind(this);

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount = async () => {
    await this.getItemList();
  };

  cache = (restList: IItem[]) => {
    if (typeof window !== undefined) {
      window.localStorage.setItem(restListCache, JSON.stringify(restList));
      console.log('Caching restaurant list');
    }
  };

  openModal = () => {
    console.log('Opening item modal');
    this.setState({
      isModalOpen: true,
      selectedItem: undefined,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  getItemList = async () => {
    const { restId } = this.props;

    const itemList: IItem[] = await this.control.getItemList(restId);
    // this.cache(itemList);
    this.setState({ itemList });
  };

  addItem = async (newItem: IItem) => {
    const { restId } = this.props;
    const itemId: string = await this.control.addItem(restId, newItem);
    if (itemId) {
      newItem.id = itemId;
      // Using `unshift` to push a newly added item to the front of the array and display items in that order
      const { itemList } = this.state;
      itemList.unshift(newItem);

      this.setState({ itemList }, () => console.log('Successfully added new item.'));
    }
    else console.error('Could not save new item');
  };

  editItem = async (newItem: IItem) => {
    const { itemList } = this.state;
    const matchingItem: IItem | undefined = itemList.find((item) => item.id === newItem.id);
    const { restId } = this.props;
    if (matchingItem && await this.control.editItem(restId, newItem)) {
      // Updating element at the same index
      const index = itemList.indexOf(matchingItem);
      const updatedItems = update(itemList, { $splice: [[index, 1, newItem]] });

      this.setState({ itemList: updatedItems });
    }
    else console.error('Could not update item');
  };

  deleteItem = async (itemId: string) => {
    const { restId } = this.props;
    if (await this.control.deleteItem(restId, itemId)) {
      this.setState(
        (prevState) => ({
          itemList: prevState.itemList.filter((item) => item.id !== itemId),
        }),
      );
    }
    else console.error('Could not delete item');
  };

  // TODO: Something...does not seem right here. Something something bad code, testing will fail, etc.
  selectItem = (itemId: string) => {
    const { itemList } = this.state;
    const selectedItem = itemList.find((item) => item.id === itemId);

    this.setState({
      isModalOpen: true,
      selectedItem,
    });
  };

  render() {
    const {
      isModalOpen,
      selectedItem,
      itemList,
    } = this.state;

    return (
      <div className={style['container']}>
        <ItemModal
          open={isModalOpen}
          item={selectedItem}
          addItem={this.addItem}
          editItem={this.editItem}
          deleteItem={this.deleteItem}
          closeModal={this.closeModal}
        />
        {/* Restaurant Items */}
        <ul className={style['item-list']}>
          {itemList?.map((item) => {
            return (
              <li key={item.id} className={style['item']}>
                <Item itemData={item} selectItem={this.selectItem} />
              </li>
            );
          })}
        </ul>
        <button type="button" className="add-button" onClick={this.openModal}>
          <span className="add-button_icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default ItemList;
