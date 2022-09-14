import { MagnifyingGlassPlus } from "phosphor-react";

import "./styles/main.css";

import logoImg from "./assets/logo.svg";

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/image 1.png" alt="image 1" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm block">4 Anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/image 2.png" alt="image 2" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Dota 2</strong>
            <span className="text-zinc-300 text-sm block">4 Anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/image 3.png" alt="image 3" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">
              Counter Strike
            </strong>
            <span className="text-zinc-300 text-sm block">4 Anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/image 4.png" alt="image 4" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Apex Legends</strong>
            <span className="text-zinc-300 text-sm block">4 Anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/image 5.png" alt="image 5" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Fortnite</strong>
            <span className="text-zinc-300 text-sm block">4 Anúncios</span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/image 6.png" alt="image 6" />
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">
              World of Warcraft
            </strong>
            <span className="text-zinc-300 text-sm block">4 Anúncios</span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black">
              Não encontrou o seu duo
            </strong>
            <span className="block text-zinc-400">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex item-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
