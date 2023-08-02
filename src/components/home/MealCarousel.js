import React, { useRef, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, Pressable } from 'react-native';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppText from '../../utils/components/AppText'
import MealModal from './MealModal';

const SLIDER_WIDTH = Dimensions.get('window').width + 30;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const MealCarousel = ({ mealList }) => {
  const [index, setIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  // const chefRecommendedMeals = mealList.filter((item) => {
  //   return item.recommended === true;
  // })
  const chefRecommendedMeals = [{
    name: 'salmon',
    photo: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  }, {
    name: 'chicken',
    photo: 'https://images.unsplash.com/photo-1572424117831-005b5e9b3ae4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  }, {
    name: 'steak',
    photo: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  }]


  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <Pressable className=' bg-transparent items-center' onPress={handlePress}>
        <Image className='object-cover h-full w-full rounded-xl' source={{url: item.photo}} />
        <AppText className='absolute text-center top-4 left-5 text-white text-xl'>{item.name}</AppText>
      </Pressable>
    )
  };

  const handlePress = () => {
    // console.log('pressed!')
    if (!isClicked) {
      carouselRef.current.stopAutoplay();
    } else {
      carouselRef.current.startAutoplay(instantly=false)
    }
    setIsClicked(!isClicked);
  };


  return (
    <>
      <View className='h-44'>
        <Carousel
          ref={(c) => (carouselRef.current = c)}
          data={chefRecommendedMeals}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          loop={true}
          autoplay={true}
          autoplayInterval={2000}
          onSnapToItem={index => setIndex(index)}
        />
        <Pagination
          containerStyle={styles.paginationContainer}
          dotsLength={chefRecommendedMeals.length}
          activeDotIndex={index}
          carouselRef={carouselRef}
          dotStyle={{
            width:10,
            height:10,
            borderRadius:10,
            marginHorizontal: 5,
            backgroundColor: 'white'
          }}
        />
        {isClicked && <MealModal />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center'
  }
})

export default MealCarousel;