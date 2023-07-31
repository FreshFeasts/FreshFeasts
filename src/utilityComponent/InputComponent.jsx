import { Text, View, StatusBa, TextInput } from "react-native";
const InputWithLabel = ({ label,labelStyle,inputStyle,...otherProps }) => {
  return (
    <View className="flex-column p-4">
      <Text className={labelStyle? labelStyle:''}>{label}</Text>
      <TextInput className={inputStyle? inputStyle:''} {...otherProps}/>
    </View>
  )
};
// An Example of what props can be sent
{/* <InputWithLabel
label="Email"
keyboardType="email-address"
name="signInEmail"
value={values.signInEmail}
placeholder="email address"
onChangeText={onChangeHandler}
/> */}
export default InputWithLabel;