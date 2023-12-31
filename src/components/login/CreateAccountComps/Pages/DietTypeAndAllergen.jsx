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
import {LogInScreenContext} from '../../../../contexts/LogInScreenContext.jsx';
const DietTypeAndAllergen = ({ setPageThree, setPageTwo, setPageOne }) => {
  const {setDietChoices,dietChoices,allergens, setAllergens} = useContext(LogInScreenContext);

  // const [dietChoices, setDietChoices] = useState([]);
  // const [allergens, setAllergens] = useState([]);

  const onContinueHandler = () => {
    console.log('dietChoices: ', dietChoices);
    console.log('allergens: ', allergens);
    setPageTwo(false);
    setPageThree(true);
  }

  const onBackHandler = () => {
    setPageTwo(false);
    setPageOne(true);
  };

  return (
    <SafeAreaView className='h-full justify-center '>
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
                dietChoices={dietChoices}
                setDietChoices={setDietChoices}
                isChosen={dietChoices.includes(item.name)}
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
                dietChoices={dietChoices}
                setDietChoices={setDietChoices}
                isChosen={allergens.includes(item.name)}
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

const PressableTags = ({ item, dietChoices, setDietChoices, allergens, setAllergens, isChosen }) => {
  const [isClicked, setIsClicked] = useState(isChosen);

  const handlePress = (item) => {
    if (item.type === 'diet') {

      if (isClicked) {
        dietChoices.splice(dietChoices.indexOf(item.name), 1)
        setDietChoices([...dietChoices]);
      } else {
        setDietChoices([item.name, ...dietChoices]);
      }
    } else {
      if (isClicked) {
        allergens.splice(allergens.indexOf(item.name), 1)
        setAllergens([...allergens]);
      } else {
        setAllergens([item.name, ...allergens]);
      }
    };
    console.log(dietChoices);
    console.log('Allergens',allergens);
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