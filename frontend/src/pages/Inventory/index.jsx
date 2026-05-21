import { useState } from 'react';
import HeaderInventory from '../../components/InventoryPages/HeaderInventory';
import TableInventory from '../../components/InventoryPages/TableInventory';

const Inventory = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, low-stock, out-of-stock

  return (
    <>
      <HeaderInventory activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <TableInventory activeFilter={activeFilter} />
    </>
  );
};

export default Inventory;
