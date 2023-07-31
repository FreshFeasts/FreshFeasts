import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import AppText from './AppText'
import Icon from "react-native-vector-icons/FontAwesome";

const DietChip = ({dietName}) => {
  const [diet, setDiet] = useState(null);

  const dietDetails = [
    {
      name: 'Vegan & Veggie',
      icon: 'leaf',
      color: 'bg-green-700'
    },
    {
      name: 'Chef\'s Choice',
      icon: 'heart-o',
      color: 'bg-red-900'
    },
    {
      name: 'Calorie Smart',
      icon: 'anchor',
      color: 'bg-blue-300'
    },
    {
      name: 'Keto',
      icon: 'lemon-o',
      color: 'bg-yellow-500'
    },
    {
      name: 'Protein Plus',
      icon: 'plus-circle',
      color: 'bg-blue-900'
    }
  ]

  useEffect(() => {
    const selectedDiet = dietDetails.find(dietDetail => dietDetail.name === dietName);
    setDiet(selectedDiet);
  }, [dietName]);

  if (!diet) {
    return null; // You can render a loading indicator or fallback UI here if needed
  }
  return(
    <View className="h-14 w-28 border-2 border-pakistangreen justify-center items-center bg-lemonchiffon rounded-2 m-2">
      <View className={`${diet.color} rounded-full p-1`}>
      <Icon name={diet.icon} size={24} color='white' />
      </View>
      <AppText className='text-xs'>{diet.name}</AppText>
    </View>
  )
};

export default DietChip;