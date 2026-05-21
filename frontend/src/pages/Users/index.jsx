import { useState, useCallback } from 'react';
import HeaderUsers from '../../components/UsersPages/HeaderUsers';
import TableUsers from '../../components/UsersPages/TableUsers';
import AddUserModal from '../../components/UsersPages/AddUserModal';

const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // We pass setUsers down to AddUserModal, but wait, AddUserModal appends to the current users list.
  // Since TableUsers handles its own state for users, we can just trigger a refresh instead.
  // So AddUserModal will just call onUserAdded when done.

  const handleUserAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <HeaderUsers onAddUser={() => setShowAddModal(true)} />
      <TableUsers refreshKey={refreshKey} />

      {showAddModal && (
        <AddUserModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          // Pass a dummy setUsers function that triggers a refresh when called with a callback
          setUsers={() => handleUserAdded()}
        />
      )}
    </>
  );
};

export default Users;
