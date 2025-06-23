// src/pages/Guestbook.tsx
import React, { useState, useEffect } from 'react';
import { Send, Heart, MessageCircle, User } from 'lucide-react';
import { Wish } from '../types';
import { db } from '../firebaseConfig'; // Import instance Firestore kamu
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'; // Import fungsi Firestore

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(true); // State untuk loading

  // Referensi ke koleksi 'wishes' di Firestore
  const wishesCollectionRef = collection(db, 'wishes');

  // Efek untuk memuat harapan dari Firebase Firestore
  useEffect(() => {
    const getWishes = async () => {
      setLoading(true);
      const q = query(wishesCollectionRef, orderBy('timestamp', 'desc')); // Urutkan berdasarkan waktu terbaru
      const data = await getDocs(q);
      const fetchedWishes: Wish[] = data.docs.map((document) => ({
        ...(document.data() as Wish), // Pastikan data sesuai dengan interface Wish
        id: document.id // ID dokumen dari Firestore
      }));
      setWishes(fetchedWishes);
      setLoading(false);
    };

    getWishes();
  }, []); // Hanya berjalan sekali saat komponen dimuat

  const addWish = async () => {
    if (newWish.name && newWish.message) {
      try {
        const wishData = { // Data yang akan disimpan ke Firestore
          name: newWish.name,
          message: newWish.message,
          timestamp: new Date().toISOString() // Simpan sebagai ISO string
        };
        const docRef = await addDoc(wishesCollectionRef, wishData);
        
        // Perbarui state lokal dengan data yang baru ditambahkan (termasuk ID dari Firestore)
        setWishes(prevWishes => [{ ...wishData, id: docRef.id }, ...prevWishes]);
        
        setNewWish({ name: '', message: '' });
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Gagal menambahkan harapan. Coba lagi!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-dancing font-bold text-purple-800 mb-4">
            💌 harapan ke aghni💌
          </h1>
          <p className="text-xl text-purple-700 mb-8">
            kasih harapan ke aghni ya teman teman
          </p>
        </div>

        {/* Add Wish Form */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-8 shadow-xl mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="text-pink-500" size={24} />
            <h2 className="text-2xl font-bold text-purple-800">Tulis Harapan</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                nama kamu
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={newWish.name}
                  onChange={(e) => setNewWish(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                pesan yang pengen disampain (bebas mau apa harapan atau apa kek)
              </label>
              <textarea
                value={newWish.message}
                onChange={(e) => setNewWish(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Write your heartfelt birthday wish..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
          
          <button
            onClick={addWish}
            disabled={!newWish.name || !newWish.message}
            className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Send size={20} />
            <span>Kirim pesan ini ke  aghni</span>
          </button>
        </div>

        {/* Wishes Display */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-purple-800 text-center mb-8 flex items-center justify-center space-x-2">
            <Heart className="text-pink-500" size={32} />
            <span>harapan untuk aghni ({wishes.length})</span>
            <Heart className="text-pink-500" size={32} />
          </h2>
          
          {loading ? (
            <p className="text-center text-gray-500">Memuat harapan...</p>
          ) : wishes.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">kasih pesan dulu baru bisa kriim ke aghni</p>
            </div>
          ) : (
            wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-l-4 border-pink-400"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-purple-800 text-lg">{wish.name}</h3>
                      <span className="text-gray-500 text-sm">
                        {new Date(wish.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{wish.message}</p>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Heart className="text-pink-400" size={16} />
                      <span className="text-sm text-gray-500">untuk aghni</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
       
    </div>
  );
};

export default Guestbook;