package com.phindjobapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.shell.MainReactPackage
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;



class MainActivity : ReactActivity(), DefaultHardwareBackBtnHandler {
    override fun getMainComponentName(): String {
        return "phindjobapp"
    }


    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return ReactRootView(this@MainActivity)
            }
        }
    }
}
