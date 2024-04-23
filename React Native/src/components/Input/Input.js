
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import { InputBox, InputView, SendButton } from './Style';
import { ButtonAudio } from '../ButtonAudio/ButtonAudio';

export const Input = () => {
    return (
        <InputBox>
            <ButtonAudio>
                <Entypo name="paper-plane" size={24} color="black" />
            </ButtonAudio>
        </InputBox>
    )
}
