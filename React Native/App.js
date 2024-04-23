
import { TouchableOpacity, View, Text } from 'react-native';
import { Header } from './src/components/Header/Header';
import { TextTitle } from './src/components/TextTitle/TextTitle';
import {  TextBox } from './src/components/TextBox/TextBox';
import { AudioBox } from './src/components/AudioBox/AudioBox';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { Container } from './src/components/Container/Container';
import { ContainerDialog } from './src/components/Container/ConatinerDialog';

import { Input } from './src/components/Input/Input';
import { Audio } from 'expo-av';
import { GravarAudio } from './src/components/ButtonAudio/ButtonAudio';
import { useState } from 'react';


export default function App() {
  const [recording, setRecording] = useState(null)
  const [audioUri, setAudioUri] = useState(null)
  const [transcription, setTranscription] = useState('')

  async function Gravar() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })
      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      await recordingObject.startAsync();
      setRecording(recordingObject)
    } catch (error) {
      
    }
  }

  async function playRecording(){
    const {sound,status} = await Audio.Sound.createAsyncs({uri: audioUri});
    if(status === "error"  ){
      console.error("failed", status);
      return;

    }
    await sound.playAsync();
  }

  async function stopRecording( ){
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      const formData = new FormData()
      formData.append('audioFile', {
        uri: uri,
        name: `audio.3gp`,
        type: `audio/3gp`
      }),
      console.log(uri)

      const response = await fetch('http://172.16.39.100:4466/api/Speech/SpeechToText',{
        method: `POST`,
        body: formData,
        headers:{ 
          'Content-Type': 'multipart/form-data'
        },
      });

      if(!response.ok){
        throw new Error(`Error: ${await response.text()}`);
      }
      setTranscription(transcription)
      setAudioUri(uri);
      console.log('Recording stopped', uri);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Container>

      <Header>
        <TextTitle>Microsoft Speech Service</TextTitle>
      </Header>

      <ContainerDialog>
        {/* <TextBox> */}
          {/* <Text>Lorem ipsum abvISVBSEJVWJNVJKRWGUWHGUOWEVUBUUBbbudvbuvbud</Text>
        </TextBox> */}
        
        <AudioBox>
        <TouchableOpacity>
        <FontAwesome name="pause" size={22} color="#8a8a8a" />
        </TouchableOpacity>
        </AudioBox>
        <Text>{transcription}</Text>
      </ContainerDialog>
      {/* <Input />  */}
      {/* <GravarAudio></GravarAudio> */}

      <TouchableOpacity onPress={recording ? stopRecording : Gravar} style={{backgroundColor: "#0078da", height: 100}}>
        { recording? <Text>clinica</Text>: <Text>gravando</Text>}
      </TouchableOpacity>
    </Container>
  );
}
