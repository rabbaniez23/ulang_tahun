import React, { useState, useEffect } from 'react';
import { Upload, X, Calendar, Camera } from 'lucide-react';
import { Photo } from '../types';
import { db, storage } from '../firebaseConfig'; // Import storage
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Storage functions

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [newPhoto, setNewPhoto] = useState<Omit<Photo, 'id'>>({ url: '', caption: '' });
  const [showUpload, setShowUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null); // New state for the actual file

  const photosCollectionRef = collection(db, 'photos');

  useEffect(() => {
    const getPhotos = async () => {
      const q = query(photosCollectionRef, orderBy('uploadDate', 'desc'));
      const data = await getDocs(q);
      setPhotos(data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Photo)));
    };

    getPhotos();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileToUpload(file); // Store the file itself
      const reader = new FileReader();
      reader.onload = (e) => {
        // Still set the Data URL for preview purposes
        setNewPhoto(prev => ({ ...prev, url: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = async () => {
    if (fileToUpload && newPhoto.caption) { // Check for fileToUpload and caption
      try {
        // 1. Upload the image to Firebase Storage
        const storageRef = ref(storage, `photos/${fileToUpload.name}-${Date.now()}`);
        const uploadResult = await uploadBytes(storageRef, fileToUpload);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        // 2. Save the image URL and other metadata to Firestore
        const photoData = {
          url: imageUrl, // Use the URL from Firebase Storage
          caption: newPhoto.caption,
          uploadDate: new Date().toISOString()
        };
        const docRef = await addDoc(photosCollectionRef, photoData);

        setPhotos(prevPhotos => [{ ...photoData, id: docRef.id }, ...prevPhotos]);
        setNewPhoto({ url: '', caption: '' });
        setFileToUpload(null); // Reset the file after upload
        setShowUpload(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Gagal menambahkan foto. Coba lagi!");
      }
    }
  };

  const deletePhoto = async (id: string) => {
    const photoDoc = doc(db, 'photos', id);
    await deleteDoc(photoDoc);
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-md">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Galeri Momen Berharga
          </span>
        </h1>

        <div className="text-center mb-10">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
          >
            <Upload className="mr-2" size={20} />
            {showUpload ? 'Sembunyikan Form Unggah' : 'Unggah Foto Baru'}
          </button>
        </div>

        {showUpload && (
          <div className="bg-white p-6 rounded-xl shadow-xl mb-10 border border-gray-200 animate-fade-in-down">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Unggah Foto Baru</h2>
            <div className="mb-4">
              <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">Pilih Gambar:</label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100"
              />
            </div>
            {newPhoto.url && (
              <div className="mb-4 text-center">
                <img src={newPhoto.url} alt="Preview" className="max-w-xs max-h-48 mx-auto rounded-lg shadow-md border border-gray-200" />
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="caption" className="block text-gray-700 text-sm font-bold mb-2">Keterangan Foto:</label>
              <input
                type="text"
                id="caption"
                value={newPhoto.caption}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Tambahkan keterangan untuk foto ini..."
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addPhoto}
              disabled={!fileToUpload || !newPhoto.caption} // Disable if no file or no caption
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Add Photo
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="relative w-full h-48 overflow-hidden">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors duration-200"
                  aria-label="Delete photo"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-800 font-semibold mb-2">{photo.caption}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={16} className="mr-1" />
                  <span>{new Date(photo.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
