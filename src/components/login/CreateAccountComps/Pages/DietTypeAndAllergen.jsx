import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useContext, useState } from "react";
import AppText from "../../../../utils/components/AppText.js";
import DietChip from "../../../../utils/components/DietChip.js";
import Icon from "react-native-vector-icons/FontAwesome";

const DietTypeAndAllergen = ({ setPageThree, setPageTwo, setPageOne }) => {
  const [dietChoice, setDietChoice] = useState([]);
  const [allergens, setAllergens] = useState([]);

  const onContinueHandler = () => {
    console.log('dietChoice: ', dietChoice);
    console.log('allergens: ', allergens);
    setPageThree(false);
  }

  const onBackHandler = () => {
    setPageThree(false);
    setPageTwo(true);
  };

  return (
    <SafeAreaView className='h-full justify-center bg-forestgreen'>
      <View className='items-center'>
        <AppText className='text-xl text-pakistangreen'>
          Choose your diet types
        </AppText>
        <View style={styles.container}>
          {dietTags.map((item) => {
            return (
              // <DietChip key={item.id} dietName={item.name} />
              <PressableTags
                key={item.id}
                item={item}
                allergens={allergens}
                setAllergens={setAllergens}
                dietChoice={dietChoice}
                setDietChoice={setDietChoice}
              />
            )
          })}
        </View>

        <AppText  className='text-xl text-pakistangreen'>
          Choose your allergens
        </AppText>
        <View style={styles.container}>
          {allergenTags.map((item) => {
            return (
              <PressableTags
                key={item.id}
                item={item}
                allergens={allergens}
                setAllergens={setAllergens}
                dietChoice={dietChoice}
                setDietChoice={setDietChoice}
              />
            )
          })}
        </View>
      </View>

      <View className="flex-row justify-evenly">
        <TouchableOpacity className="bg-[#ebd440] p-3 rounded-lg mt-4" onPress={onBackHandler}>
          <AppText>Back</AppText>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#ebd440] p-3 rounded-lg mt-4" onPress={onContinueHandler}>
          <AppText>Continue</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const PressableTags = ({ item, dietChoice, setDietChoice, allergens, setAllergens }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = (item) => {
    if (item.type === 'diet') {
      if (isClicked) {
        dietChoice.splice(dietChoice.indexOf(item.name), 1)
        setDietChoice([...dietChoice]);
      } else {
        setDietChoice([item.name, ...dietChoice]);
      }
    } else {
      if (isClicked) {
        allergens.splice(allergens.indexOf(item.name), 1)
        setAllergens([...allergens]);
      } else {
        setAllergens([item.name, ...allergens]);
      }
    };
    setIsClicked(!isClicked);
  };

  return (
    <Pressable
      onPress={() => handlePress(item)}
      style={styles.itemContainer}
      className={
        isClicked? (
          'bg-yellowgreen border-pakistangreen border-4'
        )
        : (
          'border-2 flex-row bg-lemonchiffon border-pakistangreen'
        )
      }
      >
      <View key={item.id} className='flex-row items-center'>
        <Icon name={item.icon} size={20} color='forestgreen' />
        <AppText className='ml-1 text-pakistangreen'>
          {item.name}
        </AppText>
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 230,
    flexWrap: 'wrap',
  },
  itemContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 160,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
});

const dietTags = [
  { id: '1', type: 'diet', name: 'Chef\'s Choice', icon: 'heart-o' },
  { id: '2', type: 'diet', name: 'Keto', icon: 'lemon-o' },
  { id: '3', type: 'diet', name: 'Calorie Smart', icon: 'anchor' },
  { id: '4', type: 'diet', name: 'Protein Plus', icon: 'plus-circle' },
  { id: '5', type: 'diet', name: 'Vegan & Veggie', icon: 'leaf' },
];

const allergenTags = [
  { id: '1', type: 'allergen', name: 'gluten', icon: 'check' },
  { id: '2', type: 'allergen', name: 'dairy', icon: 'check' },
  { id: '3', type: 'allergen', name: 'soy', icon: 'check' },
  { id: '4', type: 'allergen', name: 'shellfish', icon: 'check' },
  { id: '5', type: 'allergen', name: 'nuts', icon: 'check' },
];

export default DietTypeAndAllergen;