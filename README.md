# Boing Buddies – publier sur Google Play (Android uniquement)

Aucun Android Studio nécessaire : GitHub compile l’AAB pour toi.

## 1. Pubs AppLovin (15 min)
1. Crée un compte sur applovin.com → MAX → ajoute une app **Android** (package `com.boingbuddies.game`).
2. Crée 2 *Ad Units* : **Interstitial** et **Rewarded**. Note leurs IDs et ta **SDK Key** (Account → General → Keys).
3. Ouvre `ads-config.js` et remplace les valeurs. Garde `TEST_MODE: true` pour les tests, **mets `false` avant la version publique**.
4. RGPD (obligatoire en France, **avant la publication publique** ; pour les premiers tests tu peux laisser `CONSENT_FLOW: false`, puis le passer à `true`) : crée un compte AdMob (apps.admob.com) → Privacy & messaging → publie un message **GDPR** listant tes réseaux. Copie ton **App ID AdMob** (`ca-app-pub-xxx~yyy`) pour l’étape 2.
5. Ajoute une ligne `app-ads.txt` seulement si AppLovin te le demande.

## 2. Dépôt GitHub (10 min)
1. Crée un dépôt **public** `boing-buddies`. Envoie **tous les fichiers du zip sauf `android.yml`** (Add file → Upload files). Puis Add file → **Create new file**, tape comme nom `.github/workflows/android.yml` (les `/` créent les dossiers) et colle le contenu de `android.yml`.
2. Settings → Pages → Branch `main`, dossier `/ (root)`. Ton site (à donner à AppLovin) sera `https://TONPSEUDO.github.io/boing-buddies/` (page `index.html`, à personnaliser : `TON_EMAIL`, `TON NOM`). Ta politique sera sur `https://TONPSEUDO.github.io/boing-buddies/privacy.html` (remplace `[DATE]`, `[TON NOM]`, `[TON EMAIL]` dans `privacy.html`, et mets cette URL dans `ads-config.js`).
3. Crée ta clé de signature **une seule fois** (dans un Codespace GitHub ou avec Java installé) :
   `keytool -genkeypair -v -keystore upload.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000`
   puis `base64 -w0 upload.jks`. **Sauvegarde upload.jks et son mot de passe ailleurs.**
4. Settings → Secrets and variables → Actions → New secret :
   `KEYSTORE_BASE64` (sortie base64), `KEYSTORE_PASSWORD`, `KEY_ALIAS` (= `upload`), `ADMOB_APP_ID`.
5. Onglet **Actions** → *Build Android AAB* → Run workflow (versionCode = 1, puis +1 à chaque nouvel envoi). Télécharge `boing-buddies.aab` dans les artefacts.

## 3. Google Play Console
1. Crée l’app (Jeu, gratuit, contient des pubs = **Oui**). Active **Play App Signing** à l’envoi du premier AAB.
2. Fiche : icône `store/icon-512.png`, image de présentation `store/feature-graphic-1024x500.png`, **2 à 8 captures d’écran** de téléphone (fais-les sur ton téléphone avec la version de test).
3. **Content rating**, **Public cible** (13+ ou 18+, pas « enfants »), **Data safety** (voir plus bas), URL de politique de confidentialité, déclaration **ID publicitaire = Oui (publicités)**.
4. Envoie l’AAB sur **Test interne** d’abord (jusqu’à 100 testeurs, sans validation) pour vérifier les pubs, puis sur **Test fermé**.

## 4. Les 12 testeurs / 14 jours
Les comptes personnels créés après le 13/11/2023 doivent avoir un test fermé avec **au moins 12 testeurs inscrits sans interruption pendant 14 jours** avant la demande d’accès production. Le test interne et le test ouvert ne comptent pas.
- Recrute **20 à 25 testeurs** pour absorber les départs. Ajoute-les via une liste d’e-mails ou un Google Group, et partage le lien d’inscription.
- Un service de testeurs payant peut fonctionner, mais vérifie ses avis : il faut de vrais appareils qui restent inscrits 14 jours, et tes réponses au questionnaire de production doivent rester exactes. Garde ton propre groupe en secours.
- Un compte **organisation** est exempté, mais demande un numéro D-U-N-S.
- Compte environ **3 semaines** au total.

## 5. Data safety – réponses suggérées
Données collectées/partagées : **Identifiants d’appareil ou autres** (ID publicitaire), **Données d’utilisation / Diagnostics** (via AppLovin et partenaires), **Localisation approximative** (IP). Finalité : **Publicité ou marketing**. Chiffrées en transit : oui. Suppression possible : non (aucun compte). Vérifie avec la liste des réseaux que tu actives dans MAX.

## 6. Texte de fiche
**Titre** : Boing Buddies – Trampoline fou
**Courte (80 car.)** : Fais rebondir tes copains avec le trampoline. Ne les laisse jamais tomber !
**Longue** : Glisse le trampoline et sauve des personnages hilarants qui tombent du ciel ! Chaque rebond compte, mais attention : de nouveaux copains arrivent et le trampoline rétrécit. Active des pouvoirs : trampoline géant, temps ralenti ou filet de sécurité. Bats ton record !

## 7. Mises à jour
Modifie `game.html`, augmente `version_code`, relance le workflow, envoie le nouvel AAB.
