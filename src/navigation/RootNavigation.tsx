import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommentsScreen from "../screens/CommentsScreen";
import PostScreen from "../screens/PostScreen";
import { RootStackParamList } from "../types/listItemType";

const Stack  = createNativeStackNavigator<RootStackParamList>();


const RootNavigator = () => {
return(
    <Stack.Navigator>
        <Stack.Screen name="Post" component={PostScreen}/>
        <Stack.Screen name="Comments" component={CommentsScreen}/>
    </Stack.Navigator>
)
}

export default RootNavigator;