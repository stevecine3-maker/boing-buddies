// Pont AppLovin MAX (plugin Cordova) pour Capacitor. En navigateur : pubs factices du jeu.
(function(){
  const C=window.ADS_CONFIG||{};let A=null,ready=false,tries=0;
  const call=(n,...a)=>{try{if(A&&typeof A[n]==='function')return A[n](...a)}catch(e){console.log('ads',n,e)}};
  const on=(n,f)=>{const h=e=>f(e);document.addEventListener(n,h);window.addEventListener(n,h);return()=>{document.removeEventListener(n,h);window.removeEventListener(n,h)}};
  function init(){
    if(!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()))return;
    if(!(window.cordova&&cordova.require)){if(tries++<40)setTimeout(init,300);return}
    try{A=cordova.require('cordova-plugin-applovin-max.AppLovinMAX')}catch(e){if(tries++<40)setTimeout(init,300);return}
    if(C.CONSENT_FLOW!==false)call('setTermsAndPrivacyPolicyFlowEnabled',true);call('setPrivacyPolicyUrl',C.PRIVACY_URL);
    A.initialize(C.SDK_KEY,()=>{ready=true;call('loadInterstitial',C.INTERSTITIAL);call('loadRewardedAd',C.REWARDED);if(C.TEST_MODE)call('showMediationDebugger')});
    const b=document.getElementById('priv');if(b){b.style.display='block';b.onclick=()=>call('showCmpForExistingUser',()=>{})}
    window.AD_PROVIDER={
      interstitial(done){
        if(!ready||!call('isInterstitialReady',C.INTERSTITIAL)){call('loadInterstitial',C.INTERSTITIAL);return done()}
        let off1,off2;const fin=()=>{off1();off2();call('loadInterstitial',C.INTERSTITIAL);done()};
        off1=on('OnInterstitialHiddenEvent',fin);off2=on('OnInterstitialAdFailedToDisplayEvent',fin);
        call('showInterstitial',C.INTERSTITIAL)},
      rewarded(done,fail){
        if(!ready||!call('isRewardedAdReady',C.REWARDED)){call('loadRewardedAd',C.REWARDED);return fail()}
        let got=false,o1,o2,o3;const fin=()=>{o1();o2();o3();call('loadRewardedAd',C.REWARDED);got?done():fail()};
        o1=on('OnRewardedAdReceivedRewardEvent',()=>{got=true});o2=on('OnRewardedAdHiddenEvent',fin);o3=on('OnRewardedAdFailedToDisplayEvent',fin);
        call('showRewardedAd',C.REWARDED)}
    };
  }
  document.addEventListener('deviceready',init);window.addEventListener('load',()=>setTimeout(init,500));
})();
