package com.rnadmob;

import android.content.Context;
import android.util.Log;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.admanager.AdManagerAdRequest;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.annotation.Nonnull;

public class AdMobView extends FrameLayout {
    public static final String EVENT_AD_LOADED = "onAdLoaded";
    public static final String EVENT_AD_FAILED_TO_LOAD = "onAdFailedToLoad";
    public static final String EVENT_AD_OPENED = "onAdOpened";
    public static final String EVENT_AD_CLOSED = "onAdClosed";
    public static final String EVENT_SIZE_CHANGE = "onSizeChange";

    public static final String EVENT_APP_EVENT = "onAppEvent";
    private AdView adView;
    private String ClientID="";
    private String adUnitId="";
     private AdSize adSize;
    String TAG="hungvt";
    private ReactContext reactContext;
    //private AdManagerAdRequest request;
    public AdMobView(ReactContext context, String adUnitId) {
        super(context);
       
        reactContext = context;
        initAdView();

    }

    public void setId(String id){
        ClientID=id;
    }

    private void initAdView() {
        Log.d(TAG, "initAdView: ");
        if (adView != null) {
            removeView(adView);
            adView.destroy();
        }
        adView = new AdView(reactContext);
         if(adSize==null) {
            adView.setAdSize(AdSize.BANNER);
        }
        else
        {
            adView.setAdSize(adSize);
        }
        adView.setAdListener(new AdListener() {
            @Override
            public void onAdLoaded() {

                AdSize adSize = Objects.requireNonNull(adView.getAdSize());
                int width = adSize.getWidthInPixels(getContext());
                int height = adSize.getHeightInPixels(getContext());
                int left = adView.getLeft();
                int top = adView.getTop();

                Log.d(TAG, "onAdLoaded: "+width+"x"+height+"  "+top+"x"+left);

                adView.measure(width, height);
                adView.layout(left, top, left + width, top + height);

                WritableMap payload = Arguments.createMap();

                payload.putDouble("width", adSize.getWidth());
                payload.putDouble("height", adSize.getHeight());

                 
                payload = Arguments.createMap();
                payload.putString("Status","onAdLoaded");
                payload.putString("id",ClientID);
                sendEvent(EVENT_AD_LOADED, payload);
            }

            @Override
            public void onAdFailedToLoad(@Nonnull LoadAdError adError) {
                WritableMap payload = Arguments.createMap();
                payload.putString("Status","onAdFailedToLoad");
                payload.putInt("code", adError.getCode());
                payload.putString("message", adError.getMessage());
                sendEvent(EVENT_AD_FAILED_TO_LOAD, payload);
            }

            @Override
            public void onAdOpened() {
                WritableMap payload = Arguments.createMap();
                payload.putString("Status","onAdOpened");
                sendEvent(EVENT_AD_OPENED, payload);
            }

            @Override
            public void onAdClosed() {
                WritableMap payload = Arguments.createMap();
                payload.putString("Status","onAdClosed");
                sendEvent(EVENT_AD_CLOSED, payload);
            }

        });
        addView(adView);
    }

    public void setUnitId(String unitId) {

        this.adUnitId = unitId;
        requestAd();
    }

    public void setSizes(String adSizeStrings) {
        Log.d(TAG, "setSizes: "+adSizeStrings);
        this.adSize=stringToAdSize(adSizeStrings);
        requestAd();
    }

    public void setRequestOptions(ReadableMap requestOptions) {
       // request = RNAdMobCommon.buildAdRequest(requestOptions);
        requestAd();
    }

    public void requestAd() {

        initAdView();
        adView.setAdUnitId(adUnitId);
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);
    }

    private void sendEvent(String type, WritableMap payload) {
       // Log.d(TAG, "sendEvent: "+ClientID+"_"+type);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(ClientID+"_"+type, payload);

    }
    private AdSize stringToAdSize(String value) {

        Pattern pattern = Pattern.compile("([0-9]+)x([0-9]+)");
        Matcher matcher = pattern.matcher(value);

        // If size is "valXval"
        if (matcher.find()) {
            int width = Integer.parseInt(matcher.group(1));
            int height = Integer.parseInt(matcher.group(2));
            return new AdSize(width, height);
        }

        switch (value.toUpperCase()) {
            case "FLUID":
                return AdSize.FLUID;
            case "WIDE_SKYSCRAPER":
                return AdSize.WIDE_SKYSCRAPER;
            case "LARGE_BANNER":
                return AdSize.LARGE_BANNER;
            case "MEDIUM_RECTANGLE":
                return AdSize.MEDIUM_RECTANGLE;
            case "FULL_BANNER":
                return AdSize.FULL_BANNER;
            case "LEADERBOARD":
                return AdSize.LEADERBOARD;
            default:
            case "BANNER":
                return AdSize.BANNER;
        }
    }

}