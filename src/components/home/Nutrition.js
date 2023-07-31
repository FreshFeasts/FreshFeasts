import { Text, View, FlatList } from "react-native";

const Nutrition = ({ nutrition }) => {
  const renderItem = ({ item }) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    return (
      <View className="flex-row justify-between px-4 py-2 border border-gray-300 w-80">
        <Text className="text-sm font-main text-white"> {key}</Text>
        <Text className="text-sm text-white font-main">{value}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text className="text-lg text-white font-main">Nutrition Facts</Text>
      <FlatList
        data={nutrition}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Nutrition;
