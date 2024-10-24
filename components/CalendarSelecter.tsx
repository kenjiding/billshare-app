import React, { useState } from 'react';
import { TouchableOpacity, View, Modal } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CalendarSelecter({
  visible,
  onCalendarVisible,
  onCalendarSelected
}: {
  visible: boolean,
  onCalendarVisible: (flag: boolean) => void,
  onCalendarSelected: (startDate: DateData | null, endDate: DateData | null) => void,
}) {
  const [selectedDates, setSelectedDates] = useState<{[key: string]: any}>({});
  const [startDate, setStartDate] = useState<DateData | null>(null);
  const [endDate, setEndDate] = useState<DateData | null>(null);

  const handleDayPress = (day: DateData) => {
    if (!startDate) {
      // 设置起始日期
      setStartDate(day);
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true, selectedColor: '#81daed' }, // 起始日期颜色为红色
      });
    } else if (!endDate) {
      // 如果没有结束日期
      if (new Date(day.dateString) < new Date(startDate.dateString)) {
        // 如果选择的日期在起始日期之前，则重新设置起始日期
        setStartDate(day);
        setEndDate(null);
        setSelectedDates({
          [day.dateString]: { selected: true, marked: true, selectedColor: '#81daed' },
        });
      } else {
        // 设置结束日期并标记区间中的所有日期
        setEndDate(day);
        const newSelectedDates: any = {};
        const start = new Date(startDate.dateString);
        const end = new Date(day.dateString);

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const dateString = d.toISOString().split('T')[0];
          newSelectedDates[dateString] = {
            selected: true,
            marked: true,
            selectedColor: '#81daed',
            textColor: 'white',
          };
        }

        setSelectedDates(newSelectedDates);
      }
    } else {
      // 重置选择
      setStartDate(day);
      setEndDate(null);
      setSelectedDates({
        [day.dateString]: { selected: true, marked: true, selectedColor: '#69e5ff' },
      });
    }
  };

  const calendarSelectedHandler = () => {
    onCalendarVisible(false);
    onCalendarSelected(startDate, endDate);
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onCalendarVisible(false)}
    >
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}} className='flex-1 justify-center items-center'>
        <View className='bg-white w-full'>
          <View className='flex-row justify-between p-4 border-b border-gray-200'>
            <TouchableOpacity>
              <AntDesign name="checkcircleo" size={24} color="#5f5f5f" onPress={calendarSelectedHandler} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="closecircleo" size={24} color="#5f5f5f" onPress={() => onCalendarVisible(false)} />
            </TouchableOpacity>
          </View>
          <Calendar onDayPress={handleDayPress} markedDates={selectedDates} />
          <View className='h-10 bg-white'></View>
        </View>
      </View>
    </Modal>
  );
}
