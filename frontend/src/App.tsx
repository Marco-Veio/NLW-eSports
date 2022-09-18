import { useEffect, useRef, useState } from "react";
import { Root as Modal } from "@radix-ui/react-dialog";
import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import logoImg from "./assets/logo.svg";

import "./styles/main.css";
import "keen-slider/keen-slider.min.css";

import axios from "axios";

import { Game } from "./interfaces/game";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [id, setId] = useState("");

  const sliderOptions = {
    loop: true,
    breakpoints: {
      "(max-width: 400px)": {
        slides: {
          perView: 1,
          spacing: 6,
        },
      },
      "(min-width: 400px)": {
        slides: {
          perView: 2,
          spacing: 6,
        },
      },
      "(min-width: 685px)": {
        slides: {
          perView: 3.3,
          spacing: 6,
        },
      },
      "(min-width: 970px)": {
        slides: {
          perView: 4.3,
          spacing: 6,
        },
      },
      "(min-width: 1255px)": {
        slides: {
          perView: 5.3,
          spacing: 6,
        },
      },
      "(min-width: 1550px)": {
        slides: {
          perView: 6.3,
          spacing: 6,
        },
      },
    },
  };
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(sliderOptions);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions,
    });
  }, [instanceRef, sliderOptions]);

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
        <div ref={sliderRef} className="keen-slider mt-10">
          {games.map((game, index) => {
            return (
              <GameBanner
                key={game.id}
                className={`keen-slider__slide number-slide${index} flex justify-center`}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
                onClick={() => setId(game.id)}
              />
            );
          })}
        </div>

        <CreateAdBanner onClick={() => setId("")} />

        <CreateAdModal game={id} onChange={setId} />
      </Modal>
    </div>
  );
}

export default App;
