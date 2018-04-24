import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ItemCard = ({ recipe }) => {
  return (
    <View style={styles.box}>
      <Text>{recipe.fields.title}</Text>
      <Text>{recipe.fields.description}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderColor: 'red',
    borderWidth: 1
  }
});

const List = ({ items }) => (
  <View>{items.map(recipe => <ItemCard recipe={recipe} />)}</View>
);

export default List;
