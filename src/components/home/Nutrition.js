import { Text, View, FlatList } from "react-native";
import AppText from "../../utils/components/AppText";

const Nutrition = ({ nutrition }) => {
  const renderItem = ({ item }) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return (
      <View className="flex-row justify-between px-2 py-1 border border-gray-300 w-60">
        <AppText className="text-xs text-white"> {key}</AppText>
        <AppText className="text-xs text-white">{value}</AppText>
      </View>
    );
  };

  return (
    <View className="justify-start">
      <AppText className="text-xs text-white">Nutrition Facts</AppText>
      <FlatList
        data={nutrition}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled ={false}
      />
    </View>
  );
};

export default Nutrition;
