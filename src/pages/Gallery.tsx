// src/pages/Gallery.tsx
import React, { useState, useEffect } from 'react';
import { Upload, X, Calendar, Camera } from 'lucide-react';
import { Photo } from '../types';
import { db } from '../firebaseConfig'; // Import instance Firestore kamu
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'; // Import fungsi Firestore

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' });
  const [loading, setLoading] = useState(true); // State untuk loading

  // Referensi ke koleksi 'photos' di Firestore
  const photosCollectionRef = collection(db, 'photos');

  // Efek untuk memuat foto dari Firebase Firestore
  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      const q = query(photosCollectionRef, orderBy('uploadDate', 'desc')); // Urutkan berdasarkan tanggal upload terbaru
      const data = await getDocs(q);
      const fetchedPhotos: Photo[] = data.docs.map((document) => ({
        ...(document.data() as Photo), // Pastikan data sesuai dengan interface Photo
        id: document.id // ID dokumen dari Firestore
      }));
      setPhotos(fetchedPhotos);
      setLoading(false);
    };

    getPhotos();
  }, []); // Hanya berjalan sekali saat komponen dimuat

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // FileReader untuk mengonversi file gambar menjadi Data URL
      // Catatan: Menyimpan Data URL di Firestore bisa sangat besar dan tidak efisien.
      // Untuk aplikasi yang lebih besar, sebaiknya gunakan Firebase Storage untuk menyimpan gambar
      // dan hanya simpan URL gambar di Firestore.
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhoto(prev => ({ ...prev, url: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = async () => {
    if (newPhoto.url && newPhoto.caption) {
      try {
        const photoData = { // Data yang akan disimpan ke Firestore
          url: newPhoto.url,
          caption: newPhoto.caption,
          uploadDate: new Date().toISOString()
        };
        const docRef = await addDoc(photosCollectionRef, photoData);

        // Perbarui state lokal dengan data yang baru ditambahkan (termasuk ID dari Firestore)
        setPhotos(prevPhotos => [{ ...photoData, id: docRef.id }, ...prevPhotos]);
        
        setNewPhoto({ url: '', caption: '' });
        setShowUpload(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Gagal menambahkan foto. Coba lagi!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-dancing font-bold text-purple-800 mb-4">
            📸your memory
          </h1>
          <p className="text-xl text-purple-700 mb-8">
            semoga bisa jadi kenangan
          </p>
          
          <button
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Upload size={20} />
            <span>tambah foto untuk aghni disini</span>
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Memuat foto...</p>
          ) : photos.length === 0 ? (
            <div className="text-center py-12 col-span-full">
              <Camera className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">Belum ada foto yang diupload.</p>
            </div>
          ) : (
            photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Camera size={16} className="inline mr-1" />
                    <span className="text-sm">{photo.caption}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-800 truncate">{photo.caption}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar size={12} className="mr-1" />
                    {new Date(photo.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-purple-800">tambah foto baru</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                {newPhoto.url && (
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <img
                      src={newPhoto.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Add a beautiful caption..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={addPhoto}
                  disabled={!newPhoto.url || !newPhoto.caption}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Add Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-purple-800">{selectedPhoto.caption}</h3>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              </div>
              
              <p className="text-gray-600 flex items-center">
                <Calendar size={16} className="mr-2" />
                Added on {new Date(selectedPhoto.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Gallery;
