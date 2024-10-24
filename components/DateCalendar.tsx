import React, { useState } from 'react';
import dayjs from 'dayjs';
import { TouchableOpacity, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CalendarSelecter from '@/components/CalendarSelecter';
import { DateData } from 'react-native-calendars';

type DateCalendarProps = {
  onDateChange: ({start, end}: {start: DateData, end: DateData}) => void;
  className?: string;
};

const DateCalendar: React.FC<DateCalendarProps> = ({
  onDateChange,
  className
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(() => {
    const currentDate = dayjs().format('MM/DD/YYYY');
    return {
      start: currentDate,
      end: currentDate,
    }
  });

  const onCalendarSelected = (start: DateData | null, end: DateData | null) => {
    if(!start || !end) return;
    onDateChange({start, end});
    setDate({
      start: start.dateString,
      end: end.dateString,
    });
  }
  
  return (
    <View className={className}>
      <View
        style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
        className={'mt-4 rounded-lg border-1 border-blue-200'} >
        <TouchableOpacity
          className={'flex-row items-center justify-between p-3 pl-6 pr-4'}
          onPress={() => setCalendarVisible(true)}>
          <Text>{date.start}  -  {date.end}</Text>
          <AntDesign name="right" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <CalendarSelecter
        visible={calendarVisible}
        onCalendarSelected={onCalendarSelected}
        onCalendarVisible={setCalendarVisible} />
    </View>
  );
};

export default DateCalendar;