import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { InterstitialView,OpenAppView } from '../LIB/RNAdmob/src';
import GlobalValue from './Assets/GlobalValue';
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
  const [config, set_Dataconfig] = useState();
  const [Loading,setLoading]=useState(true);
  const [interView,setInterView] = useState([]);
  const [openAppView,setOpenAppViewView] = useState([]);
  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage khi ứng dụng được mở lần đầu tiên
    const getData1 = async () => {
      try {
        var interView_obj=new InterstitialView(GlobalValue.admob_Interstitial)
        var openAppView_obj=new OpenAppView(GlobalValue.admob_open_app)
        setOpenAppViewView(openAppView_obj)
        setInterView(interView_obj)
        const jsonValue = await getData('HistoryQR');
        if (jsonValue != null) {
          setdata_his(jsonValue);
        }
        else { setdata_his([]); }

        const ConfigValue = await getData('Config');

        if (ConfigValue != null) {
          set_Dataconfig(ConfigValue);
        }
        else { set_Dataconfig({'saveScan':true,'saveCreate':true,'AutoSearch':true}); }
        
        setLoading(false)
         
        
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

  const saveConfig = async (newData) => {
    
    try {
      await storeData('Config', newData);
           // Cập nhật dữ liệu mới vào state
        set_Dataconfig(newData);
    } catch (e) {

    }
  };
  const value = {
    data_his, saveData,config,saveConfig,Loading,interView,openAppView
  };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};