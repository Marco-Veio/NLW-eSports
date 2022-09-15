import { useEffect, useState } from "react";
import {
  Close as CloseModal,
  Root as Dialog,
  Content as ModalContent,
  Title as ModalTitle,
  Overlay,
  Portal,
} from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Input } from "./components/Input";

import logoImg from "./assets/logo.svg";

import "./styles/main.css";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        console.info(data);
        setGames(data);
      });
  }, []);

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
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog>
        <CreateAdBanner />

        <Portal>
          <Overlay className="bg-black/60 inset-0 fixed">
            <ModalContent className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <ModalTitle className="text-3xl font-black">
                Publique um anúncio
              </ModalTitle>

              <form className="mt-8 flex flex-col gap-4">
                <Input
                  id="game"
                  type="text"
                  label="Qual o game?"
                  placeholder="Selecione o game que deseja jogar"
                />

                <Input
                  id="name"
                  type="text"
                  label="Seu nome (ou nickname)"
                  placeholder="Como te chamam no jogo?"
                />

                <div className="grid grid-cols-2 gap-6">
                  <Input
                    type="number"
                    placeholder="0"
                    id="yearsPlaying"
                    label="Joga há quantos anos?"
                  />

                  <Input
                    type="text"
                    placeholder="Usuario#000"
                    id="discord"
                    label="Qual seu Discord?"
                  />
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando custuma jogar?</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        title="Domingo"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        D
                      </button>
                      <button
                        title="Segunda"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                      <button
                        title="Terça"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        T
                      </button>
                      <button
                        title="Quarta"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        Q
                      </button>
                      <button
                        title="Quinta"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        Q
                      </button>
                      <button
                        title="Sexta"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                      <button
                        title="Sábado"
                        className="w-8 h-8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" placeholder="De" id="hourStart" />
                      <Input type="time" placeholder="De" id="hourEnd" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <CloseModal className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                    Cancelar
                  </CloseModal>
                  <button
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  >
                    <GameController className="w-6 h-6" />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </ModalContent>
          </Overlay>
        </Portal>
      </Dialog>
    </div>
  );
}

export default App;
