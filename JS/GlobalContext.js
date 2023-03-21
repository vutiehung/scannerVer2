import React, { createContext, useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);       
  } catch (e) {
    
    // saving error
  }
};

const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);       
    
    return jsonValue != null ? JSON.parse(jsonValue) : null;   
     
  } catch (e) {
     
  }
};
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [data_his, setdata_his] = useState([]);

  
  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi ứng dụng được mở lần đầu tiên
    const getData1 = async () => {
      try {
        const jsonValue = await getData('HistoryQR');
        
        if (jsonValue != null) {
           
          setdata_his(jsonValue);
        }
        else {setdata_his([]);}
      } catch (e) {
        
      }
    };

    getData1();
  }, []);

  const saveData = async (newData) => {
    try {
      // Lưu dữ liệu mới vào AsyncStorage
     
      await storeData('HistoryQR', newData);
      
      // Cập nhật dữ liệu mới vào state
     setdata_his(newData);
    } catch (e) {
      
    }
  };



  const value = {
    data,setData,data_his,saveData
    };
    

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};