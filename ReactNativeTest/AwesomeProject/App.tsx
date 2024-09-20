import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, Image, TouchableHighlight, StyleSheet} from 'react-native';

type Post = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  color: string
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Post[]>([]);
  
  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'red',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
  };

  const getPosts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={{padding: 24, alignItems: 'center'}}> 
              <Image
                style={{
                  width: 150,
                  height: 150, 
                  alignItems: 'center'                
                }}
                source={{
                uri: item.image,
                }}
              />
              <Text>
                {item.title}
              </Text>
              <Text style={{textAlign: 'justify',color:'#1B3D6C'}}>
                {item.description}
              </Text>
              <Text>
                {item.price}
              </Text>
              <TouchableHighlight {...touchProps}>
                <Text>Like</Text>
              </TouchableHighlight>
            </View>            
          )}
        />
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNormal: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'blue',
    borderWidth: 1,
    height: 30,
    width: 100,
  }
});

export default App;