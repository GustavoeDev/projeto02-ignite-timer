import { HandPalm, Play } from "phosphor-react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

import { ButtonContainer, HomeContainer, StopButtonContainer } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

const newFormValidantionSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  minutes: zod
    .number()
    .min(5, "Precisa ter no mínimo 5 minutos")
    .max(60, "Precisa ter no máximo 60"),
});

type NewFormData = zod.infer<typeof newFormValidantionSchema>;

export function Home() {
  const { cycleActive, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewFormData>({
    resolver: zodResolver(newFormValidantionSchema),
    defaultValues: {
      task: "",
      minutes: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const isButtonDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {cycleActive ? (
          <StopButtonContainer onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopButtonContainer>
        ) : (
          <ButtonContainer disabled={isButtonDisabled} type="submit">
            <Play size={24} />
            Começar
          </ButtonContainer>
        )}
      </form>
    </HomeContainer>
  );
}
