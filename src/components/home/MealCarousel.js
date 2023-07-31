import React, { useRef, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, Pressable } from 'react-native';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppText from '../../utils/components/AppText'
import MealModal from './MealModal';

const SLIDER_WIDTH = Dimensions.get('window').width + 30;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)
const data = [
  {
    title: "Aenean leo",
    body: "slide 1",
    imgUrl: 'https://images.unsplash.com/photo-1633327760690-d9bb0513f942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: "In turpis",
    body: "slide 2",
    imgUrl: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
  },
  {
    title: "Lorem Ipsum",
    body: "slide 3",
    imgUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
];


const MealCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <Pressable className=' bg-transparent items-center' onPress={handlePress}>
        <Image className='object-cover h-full w-full rounded-xl' source={{url: item.imgUrl}} />
        <AppText className='absolute text-center top-4 left-5 text-white text-xl'>{item.title}</AppText>
      </Pressable>
    )
  };

  const handlePress = () => {
    console.log('pressed!')
    carouselRef.current.stopAutoplay();
    setIsClicked(true);
  };


  return (
    <>
      <View className='h-44'>
        <Carousel
          ref={(c) => (carouselRef.current = c)}
          data={data}
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
          dotsLength={data.length}
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
        {/* {isClicked && <MealModal />} */}
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