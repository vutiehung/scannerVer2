import { NativeModules, Platform } from 'react-native';
 
import AdmobBanner from './rdadmob_banner/AdmobBanner';
import OpenAppView from './rnadmob_OpenApp/OpenAppView';
import InterstitialView from './rnadmob_Interstitial/InterstitialView';
const LINKING_ERROR =
  `The package 'rnadmob' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RNAdmob = NativeModules.RNAdmob
  ? NativeModules.RNAdmob
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

 
export {AdmobBanner,InterstitialView,OpenAppView}