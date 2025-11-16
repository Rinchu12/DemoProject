import { useReducer } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import {
  EMAIL,
  EMAIL_ERROR,
  PASSWORD,
  PASSWORD_ERROR,
  SHOW_PASSWORD,
} from '../../constants/constants';

interface LoginDataProps {
  email: string;
  password: string;
  showPassword: boolean;
  emailError?: string | null;
  passwordError?: string | null;
}

type ActionType =
  | { type: typeof EMAIL; payload: string }
  | { type: typeof PASSWORD; payload: string }
  | { type: typeof SHOW_PASSWORD }
  | { type: typeof EMAIL_ERROR; payload: string | null }
  | { type: typeof PASSWORD_ERROR; payload: string | null };

const LoginScreen = () => {
  const init: LoginDataProps = {
    email: '',
    password: '',
    showPassword: false,
    emailError: null,
    passwordError: null,
  };
  const reducer = (state: LoginDataProps, action: ActionType) => {
    switch (action.type) {
      case EMAIL:
        return { ...state, email: action.payload ?? '' };
      case PASSWORD:
        return { ...state, password: action.payload ?? '' };
      case SHOW_PASSWORD:
        return { ...state, showPassword: !state.showPassword };
      case EMAIL_ERROR:
        return { ...state, emailError: action.payload ?? null };
      case PASSWORD_ERROR:
        return { ...state, passwordError: action.payload ?? null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);

  const handleLogin = () => {
    validateCredentials();
  };

  const handleSignup = () => {};

  const validateCredentials = () => {
    let valid = true;

    // EMAIL VALIDATION
    if (!state.email.trim() || !state.email.includes('@')) {
      dispatch({ type: EMAIL_ERROR, payload: 'Invalid email address' });
      valid = false;
    } else {
      dispatch({
        type: EMAIL_ERROR,
        payload: null,
      });
      valid = true;
    }

    // PASSWORD VALIDATION
    if (!state.password || state.password.length < 6) {
      dispatch({
        type: PASSWORD_ERROR,
        payload: 'Password must be at least 6 characters',
      });
      valid = false;
    } else {
      dispatch({
        type: PASSWORD_ERROR,
        payload: null,
      });
      valid = true;
    }

    if (!valid) return;

    Alert.alert('Login Success!!!!!', 'User Logged in successfully');
  };
  return (
    <View>
      <View>
        <TextInput
          value={state.email}
          onChangeText={text => dispatch({ type: EMAIL, payload: text })}
        />
        <Text>{state?.emailError}</Text>
        <TextInput
          value={state.password}
          onChangeText={text => dispatch({ type: PASSWORD, payload: text })}
          secureTextEntry={!state.showPassword}
        />
        <Text>{state?.passwordError}</Text>
        <Button
          title={state.showPassword ? 'Hide' : 'Show'}
          onPress={() => dispatch({ type: SHOW_PASSWORD })}
        />
        
        <View>
          <Button title="Login" onPress={handleLogin} />
          <View>
            <Text>Need an account?</Text>
            <Button title="Sign up" onPress={handleSignup} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
