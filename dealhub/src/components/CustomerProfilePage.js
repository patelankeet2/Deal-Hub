import React, { useEffect, useState } from 'react';
import './CustomerProfilePage.css';
import { auth, db, storage } from '../firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
 
const CustomerProfilePage = () => {
  const user = auth.currentUser;
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
 
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
 
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          ...profile,
          name: data.name || '',
          email: data.email || user.email,
          phone: data.phone || '',
          address: data.address || '',
          imageUrl: data.imageUrl || '',
        });
        setPreview(data.imageUrl || '');
      }
    };
 
    fetchProfile();
  }, [user]);
 
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };
 
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
 
    const docRef = doc(db, 'users', user.uid);
    let updatedData = {
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
    };
 
    if (imageFile) {
      const imageRef = ref(storage, `profiles/${user.uid}`);
      await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(imageRef);
      updatedData.imageUrl = downloadURL;
    }
 
    await updateDoc(docRef, updatedData);
    alert('✅ Profile updated successfully!');
  };
 
  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
 
      <form className="profile-form" onSubmit={handleSave}>
        <div className="profile-photo">
          {preview ? (
            <img src={preview} alt="Profile" />
          ) : (
            <div className="placeholder">No Image</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
 
        <label>Name</label>
        <input name="name" value={profile.name} onChange={handleChange} required />
 
        <label>Email</label>
        <input value={profile.email} disabled />
 
        <label>Phone</label>
        <input name="phone" value={profile.phone} onChange={handleChange} />
 
        <label>Address</label>
        <textarea name="address" value={profile.address} onChange={handleChange} />
 
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
 
export default CustomerProfilePage;