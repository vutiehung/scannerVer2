
import { NativeModules } from "react-native";
 
export default class OpenAppView {

    constructor(AdUnitID) {
        this.adUnitID = AdUnitID;
        this.loaded = false
        this.AdMobAppOpenManager = NativeModules.AdMobAppOpenManager;
    }
    Load(onLoaded) {
        this.AdMobAppOpenManager.Load(this.adUnitID, () => {
            this.loaded =true;
            onLoaded();
        });
    }
    Show(){
        if(this.loaded) 
        {
            this.AdMobAppOpenManager.showAd(() => { this.loaded =false;this.Load(()=>{console.log("đã load lại")})})
            return true;
        }
        return false;
    }

}



