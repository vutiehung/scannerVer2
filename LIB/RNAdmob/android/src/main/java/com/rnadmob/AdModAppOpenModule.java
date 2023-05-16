package com.rnadmob;
import android.content.Context;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class AdModAppOpenModule extends ReactContextBaseJavaModule {
    private AdMobAppOpenManager mInterstitialAdManager;
    Context context;
    public AdModAppOpenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context=reactContext;
    }

    @Override
    public String getName() {
        return "AdMobAppOpenManager";
    }

    @ReactMethod
    public void Load(String adUnitId, final Callback callback) {
        mInterstitialAdManager = new AdMobAppOpenManager(context,getCurrentActivity(), adUnitId);
        mInterstitialAdManager.Load(callback);
        //callback.invoke();
    }

    @ReactMethod
    public void showAd(final Callback callback) {

        mInterstitialAdManager.showAd();
        callback.invoke();
    }


}