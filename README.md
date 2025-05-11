# AmISafe Mobile App

This is the **React Native frontend** for the AmISafe platform — a mobile safety and crime awareness app designed to help users stay informed about crime patterns in their surroundings.

---

## 🚀 Features

* View nearby crime incidents using interactive maps
* Predict likely crime types based on location and time
* Clean and responsive UI using NativeWind (Tailwind CSS for React Native)
* Firebase authentication and cloud messaging integration

---

## 📁 Project Structure

```
amisafe-mobile/
├── app/                       # Main application screens and logic
├── assets/                    # Fonts, icons, images
├── android/                   # Native Android setup
├── ios/                       # Native iOS setup
├── .firebase/                 # Firebase emulator config (optional)
├── .firebaserc                # Firebase project config
├── firebase.json              # Firebase setup
├── babel.config.js            # Babel configuration
├── metro.config.js            # Metro bundler config
├── tailwind.config.js         # Tailwind (NativeWind) config
├── nativewind-env.d.ts        # Type definitions for NativeWind
├── package.json               # Node dependencies and scripts
└── README.md                  # This documentation
```

---

## ⚙️ Technologies Used

* **React Native** (Expo + Custom Dev Client)
* **NativeWind (Tailwind CSS for RN)**
* **TypeScript**
* **Redux Toolkit**
* **React Navigation**
* **Google Maps Integration**

---

## 🧪 Running the App Locally

### 1. Clone the Repository

```bash
git clone https://github.com/dilshankm/amisafe-mobile.git
cd amisafe-mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App (with Custom Dev Client)

```bash
npx expo start --dev-client
```

> ⚠️ You must have the Expo Go **custom dev client** installed on your emulator/device for native modules (e.g. maps, Firebase).

### 4. Run on Emulator/Device

```bash
npx expo run:android
npx expo run:ios
```

---

## 🧪 Key Functional Areas

* **Sign-up/Login Flow** with Firebase Email OTP
* **User Preferences** for crime alert radius and location
* **Map Screen** with crime markers and bottom sheet details
* **Prediction Screen** showing top 3 predicted crimes
* **Settings/Profile Screen** to manage user data

---

## 📄 .gitignore Recommendation

```gitignore
node_modules/
.expo/
.expo-shared/
android/.gradle/
android/app/build/
ios/Pods/
.env
.firebase/
.DS_Store
*.keystore
```

---

## 🧹 Future Enhancements

* Crime heatmaps
* Dark mode and theme customization

---

## 🤝 License

MIT License © Dilshan Udara Kodithuwakku Maddege
