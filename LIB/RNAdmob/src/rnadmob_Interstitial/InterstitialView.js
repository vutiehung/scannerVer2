
import { NativeModules } from "react-native";
 
export default class InterstitialView {

    constructor(AdUnitID) {
        this.adUnitID = AdUnitID;
        this.loaded = false
        this.InterstitialAdManager = NativeModules.InterstitialAdManager;
    }
    Load(onLoaded) {
        this.InterstitialAdManager.Load(this.adUnitID, () => {
            this.loaded =true;
            onLoaded();
        });
    }
    Show(){
        if(this.loaded) 
        {
            this.InterstitialAdManager.showAd(() => { this.loaded =false;this.Load(()=>{console.log("đã load lại")})})
            return true;
        }
        return false;
    }

}



