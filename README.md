# Legacy Radio – Mobile App (Android & iOS)

**Legacy Radio** is a cross-platform mobile voice communication app designed for professional drivers and logistics environments. It allows users to join dedicated voice servers with role-based access and Push-to-Talk (PTT) functionality. The app is developed using **Flutter**, supporting both Android and iOS platforms, including Android Auto and Apple CarPlay.

---

## Features

- JWT-based user authentication
- View list of available servers based on subscription
- Join one server at a time
- Channel selection and real-time voice communication
- Push-to-Talk (PTT) functionality
- Role-based channel permissions and access control
- Configurable hardware button support (Android)
- Volume knob integration (Android)
- Voice activity indicators
- Supports Android Auto & Apple CarPlay (read-only driving mode)

---

## Technology Stack

- **Flutter** (Dart)
- **WebRTC** or custom UDP for audio transmission
- REST API integration (authentication, subscriptions, servers)
- Secure local storage (JWT tokens)

---

## Platform Support

- **Android:** 8.0+ (SDK 26+)
- **iOS:** 14.0+
- **Android Auto** (Infotainment-compatible)
- **Apple CarPlay** (Infotainment-compatible)

---

## Screens

- **Login Screen**
- **Dashboard**
- **Server List**
- **Channel List**
- **Voice UI (PTT)**
- **Settings (button mapping, audio device selection)**

---

## API Integration

- `POST /auth/login` – Authenticate and retrieve JWT
- `GET /servers` – List user-specific available servers
- `GET /subscriptions` – Validate current access
- `POST /channel/join` – Connect to voice server
- `POST /channel/leave` – Disconnect

---

## Getting Started

### Prerequisites

- Flutter SDK 3.x
- Android Studio or Xcode
- REST API and backend server running

### Install

```bash
git clone https://github.com/Legacy-DEV-Team/legacy-radio-app.git
cd legacy-radio-app
flutter pub get
flutter run
```

---

## Configuration

- Set API base URL in `lib/config.dart`
- Optional: Configure debug logging and test server IDs

---

## Build

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

---

## License

This project is licensed under the **MIT License**.  
© 2025 Legacy DEV Team. All rights reserved.