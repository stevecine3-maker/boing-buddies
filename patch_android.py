# Patch du projet Android généré par Capacitor : portrait, AD_ID, API 36, version, icônes, UMP.
import os,re,shutil,sys
A='android';ver=os.environ.get('VERSION_CODE','1');name=os.environ.get('VERSION_NAME','1.0.'+ver);admob=os.environ.get('ADMOB_APP_ID','')
def rw(p,f):
    s=open(p,encoding='utf-8').read();n=f(s);open(p,'w',encoding='utf-8').write(n)
m=A+'/app/src/main/AndroidManifest.xml'
def man(s):
    s=re.sub(r'(<activity\b)',r'\1 android:screenOrientation="portrait"',s,count=1) if 'screenOrientation' not in s else s
    if 'AD_ID' not in s: s=s.replace('<application','<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>\n    <application',1)
    if admob and 'APPLICATION_ID' not in s: s=s.replace('</application>','<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="%s"/>\n    </application>'%admob,1)
    return s
rw(m,man)
v=A+'/variables.gradle'
if os.path.exists(v):
    def var(s):
        for k in('targetSdkVersion','compileSdkVersion'):
            s=re.sub(k+r'\s*=\s*(\d+)',lambda x:'%s = %d'%(k,max(36,int(x.group(1)))),s)
        return s
    rw(v,var)
g=A+'/app/build.gradle'
def gr(s):
    s=re.sub(r'versionCode\s+\d+','versionCode '+ver,s);s=re.sub(r'versionName\s+"[^"]*"','versionName "%s"'%name,s)
    if 'user-messaging-platform' not in s: s=re.sub(r'dependencies\s*\{','dependencies {\n    implementation "com.google.android.ump:user-messaging-platform:3.2.0"',s,count=1)
    return s
rw(g,gr)
res=A+'/app/src/main/res'
for d in ('mdpi','hdpi','xhdpi','xxhdpi','xxxhdpi'):
    t=res+'/mipmap-'+d;os.makedirs(t,exist_ok=True)
    for n in('ic_launcher.png','ic_launcher_round.png'):shutil.copy('ic_%s.png'%d,t+'/'+n)
shutil.rmtree(res+'/mipmap-anydpi-v26',ignore_errors=True)
print('patch ok, versionCode',ver)
