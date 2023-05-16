package com.rnadmob;

import android.content.Context;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class InterstitialAdModule extends ReactContextBaseJavaModule  {
    private InterstitialAdManager mInterstitialAdManager;
    Context context;
    public InterstitialAdModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context=reactContext;
    }

    @Override
    public String getName() {
        return "InterstitialAdManager";
    }

    @ReactMethod
    public void Load(String adUnitId, final Callback callback) {
        mInterstitialAdManager = new InterstitialAdManager(context,getCurrentActivity(), adUnitId);
        mInterstitialAdManager.Load(callback);
        //callback.invoke();
    }

    @ReactMethod
    public void showAd(final Callback callback) {

        mInterstitialAdManager.showAd();
        callback.invoke();
    }


}