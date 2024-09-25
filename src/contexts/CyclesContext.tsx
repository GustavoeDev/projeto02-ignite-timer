import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
  task: string;
  minutes: number;
}

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptedDate?: Date;
  concludeDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  cycleActive: Cycle | undefined;
  isCycleActiveId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  accessStateSecondsAmount: (cycle: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [isCycleActiveId, setIsCycleActiveId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const cycleActive = cycles.find((cycle) => cycle.id === isCycleActiveId);

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === isCycleActiveId) {
          return { ...cycle, concludeDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function accessStateSecondsAmount(cycle: number) {
    setAmountSecondsPassed(cycle);
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle = {
      id: id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setIsCycleActiveId(id);
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === isCycleActiveId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setIsCycleActiveId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        cycleActive,
        isCycleActiveId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        accessStateSecondsAmount,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
