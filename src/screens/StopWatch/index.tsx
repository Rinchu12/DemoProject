import { useCallback, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const StopWatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (isRunning) {
      stop();
      return;
    }
    setIsRunning(true);
    let startTime = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 100);
  };
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };
  const reset = () => {
    setTime(0);
    stop();
  };

  const formatTime = useCallback(() => {
    const totalSeconds = Math.floor(time / 1000);

    const hour = Math.floor(totalSeconds / 3600);
    const minute = Math.floor((totalSeconds % 3600) / 60);
    const second = totalSeconds % 60;

    return `${String(hour).padStart(2, '0')} : ${String(minute).padStart(
      2,
      '0',
    )} : ${String(second).padStart(2, '0')}`;
  }, [time]);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>{formatTime()}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={reset} />
          <Button title="Stop" onPress={stop} />
          <Button title={isRunning ? 'Pause' : 'Start'} onPress={start} />
        </View>
      </View>
    </View>
  );
};

export default StopWatch;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
