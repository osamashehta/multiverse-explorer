import { Character } from "@/types/character";
import Container from "../ui/Container";
type CharacterCardProps = {
  character: Character;
};
const CharacterCard = ({ character }: CharacterCardProps) => {
  console.log("data.........", character);
  return <Container className="mt-4 md:mt-8">CharacterCard</Container>;
};

export default CharacterCard;
