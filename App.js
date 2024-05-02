import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { API_KEY, API_URL } from "@env"

export default function App() {

  const [inputText, setInputText] = useState('')
  const [translatedText, setTramslatedText] = useState('')
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Turkish');
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTO] = useState(false)



  const translateText = async () => {
    try {
      const response = await axios.post(`${process.env.API_URL}/v1/chat/completions`, {
        messages: [
          { role: 'user', content: `Translate the following ${fromLanguage} text into ${toLanguage}: "${inputText}"` },
          { role: 'assistant', content: 'translate' }
        ],
        max_tokens: 500,
        model: 'gpt-3.5-turbo'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`
        },
      });
      setTramslatedText(response.data.choices[0].message.content);
      Keyboard.dismiss();

    } catch (error) {
      // Handle error here
      console.error('Error translating text:', error.response.data);
    }
  }


  return (
    <View style={styles.container}>
      <Image style={styles.imageshen} source={require(".//src/images/shenn.png")} />
      <View style={styles.dropdowncontainer}>
        <DropDownPicker
          open={openFrom}
          value={fromLanguage}
          setOpen={setOpenFrom}
          setValue={setFromLanguage}
          theme='DARK'
          zIndex={9999}
          items={[
            { label: 'English', value: 'English' },
            { label: 'French', value: 'French' },
            { label: 'German', value: 'German' },
            { label: 'Turkish', value: 'Turkish' },
            { label: 'Bulgarian', value: 'Bulgarian' }

          ]}
          defaultValue={fromLanguage}
          style={styles.dropdown}
          containerStyle={{ flex: 1, alignItems: "center" }}
          onSelectItem={(item) => {
            setFromLanguage(item.value)
          }}
        />
        <Image style={styles.imagecomapre} source={require("./src/images/translating.png")} />
        <DropDownPicker
          open={openTo}
          value={toLanguage}
          setOpen={setOpenTO}
          setValue={setToLanguage}
          theme='DARK'
          zIndex={9999}

          items={[
            { label: 'English', value: 'English' },
            { label: 'French', value: 'French' },
            { label: 'German', value: 'German' },
            { label: 'Turkish', value: 'Turkish' },
            { label: 'Bulgarian', value: 'Bulgarian' }

          ]}
          defaultValue={toLanguage}
          style={styles.dropdown}
          containerStyle={{ flex: 1, alignItems: "center" }}
          onSelectItem={(item) => {
            setToLanguage(item.value)
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setInputText(text)}
        value={inputText}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={translateText}
      >
       <Image style={styles.imagebotton} source={require("./src/images/translation.png")}/>
      </TouchableOpacity>
      <Text style={styles.translettextx}> {translatedText} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b090a',
    alignItems: "center"
  },
  tittle: {
    fontSize: 20,
    marginTop: 20

  },
  dropdowncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
    
  },
  dropdown: {
    backgroundColor: "#14213d",
    width: 150,
    marginTop: 50,
    color: "#fff",
    
  },
  input: {
    height: 150,
    width: '90%',
    borderRadius: 15,
    borderWidth: 1, // Border width
    borderColor: '#fca311', // Border color
    color: 'white', // Text color
    padding: 10,
    marginTop: 100
  },
  button: {
   
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  imageshen: {
    width: 150,
    height: 150,
    marginTop: 35,
    borderRadius: 10,

  },
  imagecomapre: {
    height:40,
    width:40,
    marginTop:49
   
  },
  translettextx:{
    color:"white",
    fontSize:22,
    marginTop:10
  },
  imagebotton:{
    width:50,
    height:50
  }

});


