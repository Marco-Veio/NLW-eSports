import axios from "axios";

import { useEffect, useState } from "react";
import { Check, GameController, CaretDown } from "phosphor-react";
import { Close, Content, Title, Overlay, Portal } from "@radix-ui/react-dialog";
import {
  Root as Select,
  Item as SelectItem,
  Trigger as SelectTrigger,
  Content as SelectContent,
  Viewport as SelectViewport,
  Value as SelectValue,
  Portal as SelectPortal,
  ScrollUpButton,
  ScrollDownButton,
  SelectItemText,
  SelectItemIndicator,
} from "@radix-ui/react-select";
import { Root as Checkbox, Indicator } from "@radix-ui/react-checkbox";
import {
  Root as Toggle,
  Item as ToggleItem,
} from "@radix-ui/react-toggle-group";

import { Input } from "../../components/Input";

import { Game } from "../../interfaces/game";

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [game, setGame] = useState("");

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if (
      !game ||
      !data.name ||
      !data.yearsPlaying ||
      !data.discord ||
      !data.hoursStart ||
      !data.hoursEnd
    )
      return;

    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        hoursStart: data.hoursStart,
        hoursEnd: data.hoursEnd,
        weekDays: weekDays.map((weekDay) => Number(weekDay)),
        useVoiceChannel,
      });
      alert("Anúncio criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar anúncio!");
    }
  }

  return (
    <Portal>
      <Overlay className="bg-black/60 inset-0 fixed">
        <Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Title className="text-3xl font-black">Publique um anúncio</Title>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>

              <Select defaultValue={game}>
                <SelectTrigger
                  className={`py-3 px-4 rounded text-sm bg-zinc-900 flex justify-between align-center ${
                    game === "" && "text-zinc-500"
                  }`}
                >
                  <SelectValue />
                  <CaretDown size={24} />
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent className="bg-zinc-700 py-1 text-white font-medium">
                    <ScrollUpButton />

                    <SelectViewport>
                      <SelectItem disabled value="" className="px-4 relative">
                        <SelectItemText>
                          Selecione o game que deseja jogar
                        </SelectItemText>
                      </SelectItem>
                      {games.map((game) => (
                        <SelectItem
                          key={game.id}
                          value={game.id}
                          onSelect={() => setGame(game.id)}
                          className="px-4 cursor-default hover:bg-zinc-600 focus:bg-zinc-600"
                        >
                          <SelectItemText>{game.title}</SelectItemText>
                        </SelectItem>
                      ))}
                    </SelectViewport>

                    <ScrollDownButton />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            <Input
              name="name"
              id="name"
              type="text"
              label="Seu nome (ou nickname)"
              placeholder="Como te chamam no jogo?"
            />

            <div className="grid grid-cols-2 gap-6">
              <Input
                type="number"
                placeholder="0"
                name="yearsPlaying"
                id="yearsPlaying"
                label="Joga há quantos anos?"
              />

              <Input
                type="text"
                placeholder="Usuario#000"
                name="discord"
                id="discord"
                label="Qual seu Discord?"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando custuma jogar?</label>
                <Toggle
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                  defaultValue={weekDays}
                >
                  <ToggleItem
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded  ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    D
                  </ToggleItem>
                  <ToggleItem
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleItem>
                  <ToggleItem
                    value="2"
                    title="Terça"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleItem>
                  <ToggleItem
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleItem>
                  <ToggleItem
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleItem>
                  <ToggleItem
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleItem>
                  <ToggleItem
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleItem>
                </Toggle>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hours">Qual horário do dia?</label>
                <div id="hours" className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    placeholder="De"
                    id="hoursStart"
                    name="hoursStart"
                  />
                  <Input
                    type="time"
                    placeholder="De"
                    id="hoursEnd"
                    name="hoursEnd"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                onCheckedChange={(checked) =>
                  setUseVoiceChannel(checked ? true : false)
                }
                checked={useVoiceChannel}
              >
                <Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Indicator>
              </Checkbox>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController className="w-6 h-6" />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Content>
      </Overlay>
    </Portal>
  );
}
