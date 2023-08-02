import {Text} from 'react-native';

const AppText = ({ ...props }) => {
  return <Text className="font-main" {...props} />;
};

export default AppText;