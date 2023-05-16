
package com.rnadmob;
import android.app.Activity;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.appopen.AppOpenAd;
import com.google.android.gms.ads.appopen.AppOpenAd.AppOpenAdLoadCallback;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

public class AdMobAppOpenManager {
    private AppOpenAd mInterstitialAd;
    private Activity mActivity;
    String TAG="hungvt";
    String loc_adUnitId;
    Context loc_reactContext;

    public AdMobAppOpenManager(Context reactContext,Activity activity, String adUnitId) {
        mActivity = activity;
        loc_adUnitId=adUnitId;
        loc_reactContext=reactContext;

    }

    public void Load(Callback callback){
        mActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Log.d(TAG, "InterstitialAdManager Load: ");
                    AdRequest adRequest = new AdRequest.Builder()
                            .build();

                    AppOpenAd.load(loc_reactContext, loc_adUnitId, adRequest,
                            new AppOpenAdLoadCallback() {
                                @Override
                                public void onAdLoaded(@NonNull AppOpenAd  interstitialAd) {
                                    // The mInterstitialAd reference will be null until
                                    // an ad is loaded.
                                    mInterstitialAd = interstitialAd;
                                    callback.invoke("LoadSuccess");
                                    Log.i(TAG, "onAdLoaded");
                                }

                                @Override
                                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                                    // Handle the error
                                    Log.d(TAG, loadAdError.toString());
                                    callback.invoke("LoadFail");
                                    mInterstitialAd = null;
                                }
                            });
                }catch (Exception e)
                {
                    Log.d(TAG, "run: "+e.getMessage());
                    
                }

            }
        });

    }
    public void showAd() {
        Log.d(TAG, "InterstitialAdManager: showAd");
        mActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Log.d(TAG, "InterstitialAdManager showAd: ");

                    mInterstitialAd.show(mActivity);
                }
                catch (Exception e)
                {
                    Log.d(TAG, "run: "+e.getMessage());
                }

            }
        });
    }
}
