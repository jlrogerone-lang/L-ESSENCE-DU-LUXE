/**
 * APP.CONFIG.JS - Configuración Dinámica de Expo
 * Permite usar variables de entorno en la configuración
 */

export default {
  expo: {
    name: "L'Essence du Luxe",
    slug: "lessenceduluxe",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#050505"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.lessenceduluxe",
      infoPlist: {
        NSCameraUsageDescription: "Esta app necesita acceso a la cámara para escanear frascos de perfume.",
        NSPhotoLibraryUsageDescription: "Esta app necesita acceso a tus fotos para guardar imágenes de perfumes."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#050505"
      },
      package: "com.yourcompany.lessenceduluxe",
      versionCode: 1,
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET"
      ],
      googleServicesFile: "./google-services.json"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-font",
      [
        "@react-native-firebase/app",
        {
          "android": {
            "googleServicesFile": "./google-services.json"
          }
        }
      ],
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin"
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || "TU_PROJECT_ID_AQUI"
      }
    }
  }
};
