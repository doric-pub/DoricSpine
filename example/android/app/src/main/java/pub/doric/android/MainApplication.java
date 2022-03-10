package pub.doric.android;

import android.content.Context;

import androidx.multidex.MultiDex;
import androidx.multidex.MultiDexApplication;

import pub.doric.Doric;
import pub.doric.dangle.library.DangleLibrary;
import pub.doric.library.DoricSpineLibrary;

public class MainApplication extends MultiDexApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        Doric.init(this);
        Doric.registerLibrary(new DangleLibrary());
        Doric.registerLibrary(new DoricSpineLibrary());
    }


    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);

        MultiDex.install(this);
    }
}
