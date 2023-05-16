import { useRef,useState ,useEffect} from "react";
import AdMobView from "./AdMobView";
import { Image,View,NativeEventEmitter } from "react-native";
 
const AdmobBanner = ({adUnitID,height,size,onAdLoaded,onAdFailedToLoad,onAdOpened,onAdClosed,onSizeChange}) => {
    
   const [ComponentID, setComponentID] = useState(""); 
   const [display, setDisplay] = useState("none"); 
   const orderId = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" +   S4() +  "-" +   S4() +  S4() + S4() );
  };
 
  useEffect(() => {
    setComponentID(orderId());
  },[]) 
    const eventEmitter = new NativeEventEmitter();    
    eventEmitter.addListener(ComponentID+'_onAdLoaded', (event) => {    
      setDisplay("flex");
      (onAdLoaded&&onAdLoaded(event))
    });
    eventEmitter.addListener(ComponentID+'_onAdFailedToLoad', (event) => {
      (onAdFailedToLoad&&onAdFailedToLoad(event))  
    });
    eventEmitter.addListener(ComponentID+'_onAdOpened', (event) => {
      (onAdOpened&&onAdOpened(event))    
    });
    eventEmitter.addListener(ComponentID+'_onAdClosed', (event) => {
      (onAdClosed&&onAdClosed(event))    
    });
    eventEmitter.addListener(ComponentID+'_onSizeChange', (event) => {
      (onSizeChange&&onSizeChange(event))    
    });

 
 
    return (<>
              
                <AdMobView   style={{ height: (height?height:50),width:'100%',  justifyContent: 'center',alignItems: 'center',display: display}}
                adUnitID={adUnitID} ID={ComponentID} size={size}  ></AdMobView>
               
            </>  
    );
}

export default AdmobBanner;