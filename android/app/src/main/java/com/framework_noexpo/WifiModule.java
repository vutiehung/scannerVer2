package com.framework_noexpo;

import android.content.Context;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;
import java.util.ArrayList;
import java.util.List;
import java.util.Base64;
public class WifiModule extends ReactContextBaseJavaModule {
  private WifiManager wifiManager;

  public WifiModule(ReactApplicationContext reactContext) {
    super(reactContext);

    wifiManager = (WifiManager) reactContext.getSystemService(Context.WIFI_SERVICE);
  }

  @Override
  public String getName() {
    return "WifiModule";
  }

  @ReactMethod
  public void getWifiList(Callback callback) {
    List<WifiConfiguration> wifiConfigurations = wifiManager.getConfiguredNetworks();
    String wifiList = "";

     

    callback.invoke(wifiList);
  }
}
