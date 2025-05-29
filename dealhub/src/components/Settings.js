
import React, { useEffect, useState } from 'react';
import './Settings.css';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Settings = () => {
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    license: '',
    photoURL: ''
  });
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          license: data.license || '',
          photoURL: data.photoURL || ''
        });
        setPreview(data.photoURL || '');
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.photoURL;

      if (file) {
        const imageRef = ref(storage, `merchant-profiles/${user.uid}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        phone: formData.phone,
        license: formData.license,
        photoURL: imageUrl
      });

      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile.');
    }
  };

  return (
    <div className="settings-page">
      <h2>Merchant Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-pic">
          {preview && <img src={preview} alt="Profile" />}
          <input type="file" onChange={handleImage} />
        </div>

        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />

        <label>NZ Driving License</label>
        <input name="license" value={formData.license} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>

      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default Settings;
