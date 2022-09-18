import { useEffect, useRef, useState } from "react";
import { Root as Modal } from "@radix-ui/react-dialog";
import { Swiper, SwiperSlide } from "swiper/react";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import logoImg from "./assets/logo.svg";

import "./styles/main.css";
import "swiper/css";

import axios from "axios";

import { Game } from "./interfaces/game";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [id, setId] = useState("");

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center min-h-full">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Modal>
        <Swiper
          className="mt-10 w-full"
          spaceBetween={6}
          slidesPerView={1}
          breakpoints={{
            1550: { slidesPerView: 6 },
            1255: { slidesPerView: 5 },
            970: { slidesPerView: 4 },
            685: { slidesPerView: 3 },
            400: { slidesPerView: 2 },
          }}
          initialSlide={0}
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              className="w-[292px] h-[219px] flex justify-center"
            >
              <GameBanner
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
                onClick={() => setId(game.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <CreateAdBanner onClick={() => setId("")} />

        <CreateAdModal game={id} onChange={setId} />
      </Modal>
    </div>
  );
}

export default App;
