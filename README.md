# Legacy Radio

<p align="center">
  <img src="assets/images/legacyradio.png" alt="Legacy Radio" width="258" height="33">
</p>

A secure voice communication platform built with React Native and Expo, designed for real-time push-to-talk (PTT) communication across multiple channels and servers.

## Features

- **Secure Voice Communication**
  - Real-time push-to-talk functionality
  - Channel-based communication
  - Server organization system
  - Voice activity detection
  - Automatic gain control
  - Noise suppression

- **User Management**
  - Role-based access control (Admin, Moderator, Operator, Member)
  - User presence indicators
  - Profile management
  - Server-specific user lists

- **Channel System**
  - Multiple channels per server
  - Permission-based channel access
  - User count tracking
  - Active speaker indicators

- **Server Organization**
  - Multiple server support
  - Region-based server organization
  - Server subscription management
  - User count tracking per server

## Technology Stack

- **Frontend Framework**: React Native + Expo
- **Navigation**: Expo Router
- **State Management**: React Context
- **UI Components**: Custom components with native styling
- **Icons**: Lucide React Native
- **Fonts**: Google Fonts (Inter family)

## Prerequisites

- Node.js 16.0 or later
- npm or yarn
- Expo CLI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/legacy-radio.git
cd legacy-radio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
legacy-radio/
├── app/                    # Application routes
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── channels/      # Channel management
│   │   ├── users/         # User management
│   │   └── settings/      # App settings
│   ├── auth/              # Authentication screens
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
│   ├── channels/         # Channel-related components
│   ├── users/            # User-related components
│   └── ui/               # Common UI components
├── context/              # React Context providers
├── constants/            # App constants
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── assets/             # Static assets
```

## Key Components

### Voice Communication

- PTT (Push-to-Talk) functionality
- Real-time voice transmission
- Voice activity detection
- Audio device management

### Channel Management

- Create and join channels
- Channel permissions
- User presence tracking
- Active speaker indicators

### User Interface

- Dark theme optimized for low-light conditions
- Responsive design for various screen sizes
- Intuitive PTT button with visual feedback
- Clear user status indicators

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_API_KEY=your_api_key
```

### Audio Settings

Configure audio settings in the settings tab:
- Input/Output device selection
- Automatic gain control
- Noise suppression
- Bluetooth device support

## Development

### Running the App

```bash
# Start development server
npm run dev

# Build for web
npm run build:web

# Run linter
npm run lint
```

### Platform Support

- Web (Primary platform)
- iOS (Through Expo)
- Android (Through Expo)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)
- Built with [Expo](https://expo.dev)