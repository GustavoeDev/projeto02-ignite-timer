import { Play } from "phosphor-react";
import {
  ButtonContainer,
  CounterContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  ProjectInput,
  Separator,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <ProjectInput id="task" placeholder="Dê um nome para o seu projeto" />

          <label htmlFor="minutes">durante</label>
          <MinutesInput
            type="number"
            id="minutes"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CounterContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CounterContainer>

        <ButtonContainer type="submit">
          <Play size={24} />
          Começar
        </ButtonContainer>
      </form>
    </HomeContainer>
  );
}
