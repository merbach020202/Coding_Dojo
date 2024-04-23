import { View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { ButtonAudio } from "./Style";

export const GravarAudio = () => {
    return(
        <ButtonAudio>
            <FontAwesome name="microphone" size={24} color="white" />
        </ButtonAudio>
    )
}