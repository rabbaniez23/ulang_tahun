import React, { useEffect, useState } from "react";
import { Cake, Heart, Gift, Star } from "lucide-react";
import ConfettiEffect from "../components/ConfettiEffect";
import FloatingElements from "../components/FloatingElements";
import Footer from "../components/footer";
import Countdown from '../components/Countdown';



const Home: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const birthdayMessages = [
    "🎉 Happy Birthday, Aghni habibah putriana 🎉",
    "✨ Maaf yah telat ngasih hadiahnya  kmrn bnyk bnget yang harus dikerjain ✨",
    "🎂 tapi gk papa lah ya hehe 🎂",
    "💖 semoga sehat selalu dan dimudahkan dalam setiap urusan 💖",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % birthdayMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [birthdayMessages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 relative overflow-hidden">
      <ConfettiEffect />
      <FloatingElements />

      <div className="relative z-30 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative">
              <h1 className="text-2xl md:text-2xl font-dancing font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-4 animate-pulse">
              Kado special dari monecruzz
              </h1>
              <br></br>
              <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">
                🎂
              </div>
              <div className="absolute -top-6 -left-6 text-3xl animate-bounce">
                🎈
              </div>
            </div>

            <div className="h-20 flex items-center justify-center mb-8">
              <p className="text-2xl md:text-3xl font-semibold text-purple-800 transition-all duration-500 transform">
                {birthdayMessages[currentMessage]}
              </p>
            </div>

            <div className="flex justify-center space-x-4 mb-12">
              <Cake className="text-pink-500 animate-bounce" size={32} />
              <Heart className="text-red-500 animate-pulse" size={32} />
              <Gift className="text-purple-500 animate-bounce" size={32} />
              <Star className="text-yellow-500 animate-spin" size={32} />
            </div>
          </div>

          <Countdown />
          <br>
          </br>

          {/* Birthday Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 border border-pink-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🎂</div>
                <h3 className="text-2xl font-bold text-purple-800 mb-3">
                  Sweet Wishes 🎂
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  HBD Aghniii 🎉✨ makin nambah umur makin nambah auraa! Semoga
                  harimu secerah filter IG, penuh kejutan manis kayak snack
                  gratis, dan dilimpahi vibes positif anti toxic 😆💖
                </p>
              </div>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-pink-800 mb-3">Shine Bright ✨</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Aghni tuh kayak ring light 100 watt—selalu bikin sekitar glowing! 😆  
                    Di hari spesial ini, semoga kamu tetap nyala terus kayak neon aesthetic kamar TikTok,  
                    dan jadi inspirasi yang gak pernah low batt! 🔋💡💖
                  </p>

              </div>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 border border-yellow-200 md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="text-6xl mb-4">💝</div>
               <h3 className="text-2xl font-bold text-indigo-800 mb-3">Special Day 💝</h3>
                <p className="text-gray-700 leading-relaxed">
                  Hari ini(mungkin dah telat yah tapi gk pp wkwk) kamu jadi tokoh utama—semua kamera fokus ke kamu, aghni! 📸✨  
                  Semoga tahun ini penuh vibes healing, perjalanan seru kayak vlog,  
                  dan mimpi-mimpi kamu satu per satu check ✅ jadi kenyataan! HBD Aghniii! 🎉🎂
                </p>

              </div>
            </div>
          </div>

          {/* Interactive Birthday Cake Section */}
          <div className="text-center bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-12 shadow-2xl mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold text-purple-800 mb-8 font-dancing">
              buat harapan 🕯️
            </h2>

            <div className="relative mb-8">
              <div className="text-8xl mb-4 animate-pulse">🎂</div>
              <div className="flex justify-center space-x-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="text-3xl animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    🕯️
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-2xl">
                <div className="text-3xl mb-2">🎈</div>
                <p className="font-semibold text-pink-800">Balloons</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl">
                <div className="text-3xl mb-2">🎁</div>
                <p className="font-semibold text-purple-800">Gifts</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl">
                <div className="text-3xl mb-2">✨</div>
                <p className="font-semibold text-yellow-800">Magic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
