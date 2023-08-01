import { Text, View, StatusBa, TextInput } from "react-native";
import AppText from './AppText.js';
const InputWithLabel = ({ label,labelStyle,inputStyle,...otherProps }) => {
  return (
    <View className="flex-column p-4">
      <AppText className={labelStyle? labelStyle :''}>{label}</AppText>
      <TextInput className={inputStyle? inputStyle:''} {...otherProps}/>
    </View>
  )
};
// An Example of what props can be sent
{/* <InputWithLabel
label="Address 2:"
labelStyle="text-white"
inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
onChangeText={(text) => onChangeHandler(text, "address2")}

/> */}
export default InputWithLabel;