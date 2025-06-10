import React, { useEffect, useState } from 'react';
import './AdminManageCategory.css';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
 
const AdminManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedName, setEditedName] = useState('');
 
  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, 'categories'));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));
    setCategories(list);
  };
 
  useEffect(() => {
    fetchCategories();
  }, []);
 
  const handleAdd = async () => {
    if (!newCat.trim()) return;
    await addDoc(collection(db, 'categories'), { name: newCat.trim() });
    setNewCat('');
    fetchCategories();
  };
 
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'categories', id));
    fetchCategories();
  };
 
  const handleEdit = async (id) => {
    await updateDoc(doc(db, 'categories', id), { name: editedName });
    setEditMode(null);
    fetchCategories();
  };
 
  return (
    <div className="manage-deals-container">
      <h2>Manage Categories</h2>
 
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />
        <button onClick={handleAdd}>Add Category</button>
      </div>
 
      <table className="deals-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>
                {editMode === cat.id ? (
                  <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editMode === cat.id ? (
                  <>
                    <button onClick={() => handleEdit(cat.id)}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => {
                      setEditMode(cat.id);
                      setEditedName(cat.name);
                    }}>Edit</button>
                    <button onClick={() => handleDelete(cat.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default AdminManageCategory;