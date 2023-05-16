package com.rnadmob;

import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nonnull;

public class AdMobViewManager extends SimpleViewManager<AdMobView> {

    public static final String REACT_CLASS = "AdMobView";

    String TAG="hungvt";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected AdMobView createViewInstance(ThemedReactContext reactContext) {


        return new AdMobView(reactContext, "ca-app-pub-3940256099942544/6300978111");
    }

    @ReactProp(name = "adUnitID")
    public void setAdUnitID(AdMobView view, String adUnitID) {
        view.setUnitId(adUnitID);
    }
    @ReactProp(name = "ID")
    public void setID(AdMobView view, String ID) {
        view.setId(ID);
    }
    @ReactProp(name = "size")
    public void setSizes(AdMobView view,String adSizeStrings) {
        view.setSizes(adSizeStrings);
    }

}
