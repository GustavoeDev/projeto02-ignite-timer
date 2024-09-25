import { useContext, useEffect } from "react";
import { CounterContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {
  const {
    cycleActive,
    isCycleActiveId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    accessStateSecondsAmount,
  } = useContext(CyclesContext);

  const totalSeconds = cycleActive ? cycleActive.minutes * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (cycleActive) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          cycleActive.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          accessStateSecondsAmount(totalSeconds);
          clearInterval(interval);
        } else {
          accessStateSecondsAmount(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    cycleActive,
    totalSeconds,
    isCycleActiveId,
    accessStateSecondsAmount,
    markCurrentCycleAsFinished,
  ]);

  const currentSeconds = cycleActive ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (cycleActive) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, cycleActive]);

  return (
    <CounterContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CounterContainer>
  );
}
