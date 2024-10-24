import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Dimensions, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function App() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState<any | null>(null);
  const [endDate, setEndDate] = useState<any | null>(null);

  const translateY = useSharedValue(-Dimensions.get('window').height);

  useEffect(() => {
    if (isCalendarVisible) {
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });
    } else {
      translateY.value = withTiming(-Dimensions.get('window').height, {
        duration: 500,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [isCalendarVisible, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleDayPress = (day: any) => {
    if (!startDate) {
      setStartDate(day);
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
      });
    } else if (!endDate) {
      if (new Date(day.dateString) < new Date(startDate.dateString)) {
        setStartDate(day);
        setSelectedDates({
          [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
        });
      } else {
        setEndDate(day);
        const newSelectedDates: any = { ...selectedDates };

        const start = new Date(startDate.year, startDate.month - 1, startDate.day);
        const end = new Date(day.year, day.month - 1, day.day);

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const dateString = d.toISOString().split('T')[0];
          newSelectedDates[dateString] = { selected: true, marked: true, selectedColor: 'blue' };
        }

        setSelectedDates(newSelectedDates);
      }
    } else {
      setStartDate(day);
      setEndDate(null);
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true, selectedColor: 'blue' },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Calendar" onPress={() => setIsCalendarVisible(true)} />
      <Animated.View style={[styles.calendarContainer, animatedStyle]}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={selectedDates}
        />
        <Button title="Close Calendar" onPress={() => setIsCalendarVisible(false)} />
        <Text>Start Date: {startDate?.dateString || 'None'}</Text>
        <Text>End Date: {endDate?.dateString || 'None'}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  calendarContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 20,
  },
});
