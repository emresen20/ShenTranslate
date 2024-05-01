import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {API_KEY,API_URL} from "@env"

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
    <Text style={styles.tittle}>Shen Translate</Text>
    <View style={styles.dropdowncontainer}>
        <DropDownPicker
            open={openFrom}
            value={fromLanguage}
            setOpen={setOpenFrom}
            setValue={setFromLanguage}
            items={[
              {label:'English',value:'English'},
              {label:'French',value:'French'},
              {label:'German',value:'German'},
              {label:'Turkish',value:'Turkish'},
              {label:'Bulgarian',value:'Bulgarian'}
              
            ]}
            defaultValue={fromLanguage}
            style={styles.dropdown}
            containerStyle={{flex:1,alignItems:"center"}}
            onSelectItem={(item) => {
              setFromLanguage(item.value)
            }}
        />
           <DropDownPicker
            open={openTo}
            value={toLanguage}
            setOpen={setOpenTO}
            setValue={setToLanguage}
            items={[
              {label:'English',value:'English'},
              {label:'French',value:'French'},
              {label:'German',value:'German'},
              {label:'Turkish',value:'Turkish'},
              {label:'Bulgarian',value:'Bulgarian'}
              
            ]}
            defaultValue={toLanguage}
            style={styles.dropdown}
            containerStyle={{flex:1,alignItems:"center"}}
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
          <Text style={styles.buttontext}>
            Translate
          </Text>
    </TouchableOpacity>
    <Text> translated Text:</Text>
    <Text> {translatedText} </Text>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:"center"
  },
  tittle:{
    fontSize:20,
    marginTop:20

  },
  dropdowncontainer:{
    flexDirection:"row",
    justifyContent:"space-around"
  },
  dropdown:{
    backgroundColor:"#fff",
    width:200,
    marginTop:50,
    color:"#fff"
  },
  input:{
    height: 150,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1, // Border width
    borderColor: 'blue', // Border color
    color: 'black', // Text color
    padding: 10,
    marginTop: 100
  },
  button:{
    backgroundColor:"yellow",
    width:60,
    height:50,
    marginTop:50,
    justifyContent:"center",
    alignItems:"center"
  }

});


