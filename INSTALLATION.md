# 🚀 Quick Installation Guide

## Prerequisites

Before you start, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Expo CLI** - Install with: `npm install -g @expo/cli`
- **Expo Go app** on your phone:
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)

## 📱 Quick Start (3 Steps)

### 1. Clone & Install
```bash
git clone https://github.com/hamza-ghaydi/accesease.git
cd accesease
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Run on Your Phone
- Open **Expo Go** app on your phone
- Scan the QR code that appears in your terminal
- The app will load on your phone! 🎉

## 🌐 Alternative: Run in Web Browser

If you want to test in a web browser first:

```bash
npm start
# Then press 'w' to open in web browser
```

## ✅ Verification

The app should show:
1. **Disability Type Selection Screen** with three options
2. **No errors** in the console
3. **Working voice and chat interfaces**

## 🔧 Troubleshooting

### Common Issues:

**"Command not found: expo"**
```bash
npm install -g @expo/cli
```

**"Metro bundler issues"**
```bash
npm start -- --clear
```

**"Network issues"**
- Make sure your phone and computer are on the same WiFi network
- Try restarting the Metro bundler

**"Dependencies issues"**
```bash
rm -rf node_modules
npm install
```

## 🎯 Ready to Use!

The app comes with **mock AI responses** built-in, so it works immediately without any API setup. Perfect for:

- ✅ **Testing** all features
- ✅ **Demonstrating** the app
- ✅ **Development** without API costs

## 🚀 Next Steps

1. **Test all interfaces**: Try the blind, deaf, and motor disability interfaces
2. **Customize**: Modify the mock responses in `src/services/geminiApi.js`
3. **Deploy**: Use `expo build` when ready for production
4. **Add real AI**: Follow the API setup guide in `API_SETUP.md` (optional)

## 📞 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review [API_SETUP.md](API_SETUP.md) for AI configuration
- Create an issue on GitHub if you encounter problems

---

**🎉 That's it! Your AccessEase app should be running perfectly!**
