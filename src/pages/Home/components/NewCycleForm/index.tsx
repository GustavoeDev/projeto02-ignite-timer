import { FormContainer, MinutesInput, ProjectInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { cycleActive } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>
      <ProjectInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!cycleActive}
        {...register("task")}
      />

      <label htmlFor="minutes">durante</label>
      <MinutesInput
        type="number"
        id="minutes"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!cycleActive}
        {...register("minutes", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
