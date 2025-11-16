import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputKeyPressEvent,
  View,
} from 'react-native';

export const RootComponents = () => {
  const [otp, setOtp] = useState<string>('');

  useEffect(() => {
    console.error('OTP====', otp);
  }, [otp]);
  return <OTPInput onChange={setOtp} />;
};
interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}
const OTPInput = ({ length = 4, onChange }: OTPInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const onChangeText = (text: string, idx: number) => {
    const newValues = [...values];
    newValues[idx] = text.slice(-1);
    setValues(newValues);
    if (text && refs.current[idx + 1]) {
      refs.current[idx + 1]?.focus();
    }
    if (onChange) {
      onChange(newValues.join(''));
    }
  };

  const onBackspace = (e: TextInputKeyPressEvent, idx: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      refs.current[idx - 1]
    ) {
      refs.current[idx - 1]?.focus();
    }
  };
  return (
    <View style={styles.root}>
      {values.map((val, index) => (
        <View
          key={index}
          style={[
            styles.container,
            { borderColor: focusedIndex === index ? 'black' : 'gray' },
          ]}
        >
          <TextInput
        //   caretHidden
            style={[
              styles.input,
              { color: focusedIndex === index ? 'black' : 'gray' },
            ]}
            ref={r => {
              refs.current[index] = r;
            }}
            onChangeText={text => onChangeText(text, index)}
            onKeyPress={e => onBackspace(e, index)}
            maxLength={1}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType={'number-pad'}
          />
        </View>
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  input: {
    height: 100,
    width: 100,
    fontSize: 16,
    textAlign: 'center',
  },
});
