import React, { useEffect, useState } from 'react';
import './AdminProfile.css';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
 
const AdminProfile = () => {
  const userId = auth.currentUser?.uid;
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    photo: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
 
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setProfile({
          name: data.name || '',
          email: data.email,
          role: data.role,
          photo: data.photo || ''
        });
        setPreview(data.photo || '');
      }
    };
 
    fetchProfile();
  }, [userId]);
 
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };
 
  const handleSave = async () => {
    if (!userId) return;
 
    const userRef = doc(db, 'users', userId);
    let photoUrl = profile.photo;
 
    if (selectedImage) {
      const imageRef = ref(storage, `adminProfileImages/${userId}`);
      await uploadBytes(imageRef, selectedImage);
      photoUrl = await getDownloadURL(imageRef);
    }
 
    await updateDoc(userRef, {
      name: profile.name,
      photo: photoUrl
    });
 
    alert('Profile updated!');
  };
 
  return (
    <div className="admin-profile-container">
      <h2>Admin Profile</h2>
 
      <div className="profile-card">
        <div className="image-preview">
          <img src={preview || '/default-avatar.png'} alt="Admin" />
          <input type="file" onChange={handleImageChange} />
        </div>
 
        <div className="profile-details">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
 
          <label>Email</label>
          <input type="email" value={profile.email} disabled />
 
          <label>Role</label>
          <input type="text" value={profile.role} disabled />
 
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};
 
export default AdminProfile;