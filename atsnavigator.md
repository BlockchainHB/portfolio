# Njoyn ATS Navigator

A powerful Tampermonkey userscript that enhances navigation and search functionality for Njoyn ATS (Applicant Tracking System) platforms.

## 🚀 Features

### Universal Navigation
- **Cross-site Compatibility**: Works on any website with a floating navigation panel
- **Native Integration**: Seamlessly integrates with existing Njoyn interface
- **Instant Access**: Quick navigation to jobs, candidates, and search functions

### Smart Search Capabilities
- **Job ID Search**: Direct navigation to specific jobs by ID (format: J****-****)
- **Candidate Name Search**: Advanced candidate search with first/last name support
- **URL Parameter Support**: Handles search parameters from external links
- **Session-based Search**: Remembers pending searches across page navigation

### Enhanced User Experience
- **Adaptive UI**: Automatically detects and integrates with existing navigation
- **Loading Indicators**: Visual feedback during search operations
- **Error Handling**: Graceful handling of invalid inputs and edge cases
- **Responsive Design**: Works across different screen sizes and layouts

## 📦 Installation

### Prerequisites
- [Tampermonkey](https://www.tampermonkey.net/) browser extension
- Access to a Njoyn ATS system

### Installation Steps

1. **Install Tampermonkey**
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. **Install the Script**
   ```
   Click on "Raw" button on the njoyn-ats-navigator.user.js file
   Tampermonkey will automatically detect and prompt for installation
   ```

3. **Alternative Installation**
   - Copy the script content from `njoyn-ats-navigator.user.js`
   - Open Tampermonkey Dashboard
   - Click "Create a new script"
   - Paste the content and save

## 🎯 Usage

### Navigation Panel
The script automatically adds navigation controls based on your current context:

#### On Non-Njoyn Sites
- **Compact Panel**: Small floating panel in bottom-right corner
- **Quick Access**: Direct buttons for Jobs, Candidates, Job Search, and Name Search

#### On Njoyn Sites
- **Native Integration**: Blends with existing navigation when possible
- **Fallback Panel**: Subtle floating controls if integration isn't possible

### Search Functions

#### Job Search
1. Click "Job Search" or "Job ID" button
2. Enter job ID in format `J****-****` (e.g., `J0225-0768`)
3. Script navigates directly to the job page

#### Candidate Search
1. Click "Candidate Search" or "Name Search" button
2. Enter first name, last name, or both
3. Script navigates to candidates page and performs search automatically

### URL Parameters
Support for external integration via URL parameters:
```
https://clients.njoyn.com/CL4/in/candidate/candidates.asp?ats_first_name=John&ats_last_name=Doe
```

## ⚙️ Configuration

The script can be customized by modifying the `config` object:

```javascript
const config = {
    name: "Njoyn ATS Navigator",
    version: "2.0.0",
    urls: {
        loginPage: 'https://clients.njoyn.com/CL4/in/login.asp',
        jobsPage: 'https://clients.njoyn.com/CL4/in/job/jobs.asp',
        candidatesBase: 'https://clients.njoyn.com/CL4/in/candidate/candidates.asp',
        specificJobPage: 'https://clients.njoyn.com/CL4/in/job/job_frm.asp?j=',
        candidateSearchBase: 'https://clients.njoyn.com/CL4/in/candidate/search.asp'
    },
    autoNavigate: true,
    delays: {
        afterLoginComplete: 2000
    }
};
```

## 🛠️ Technical Details

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support

### Security & Privacy
- **No Data Collection**: Script operates entirely locally
- **No External Requests**: Only interacts with Njoyn systems
- **Session Storage**: Uses browser session storage for temporary data only

### Integration Methods
1. **Navigation Detection**: Automatically finds existing navigation elements
2. **Style Matching**: Copies styling from existing elements for seamless integration
3. **Fallback UI**: Provides floating panel when integration isn't possible

## 🐛 Troubleshooting

### Common Issues

**Script not loading:**
- Ensure Tampermonkey is enabled
- Check that script matches current site URL
- Refresh the page after installation

**Search not working:**
- Verify you're logged into Njoyn ATS
- Check that job ID format is correct (J****-****)
- Ensure candidate search has at least first or last name

**UI elements not appearing:**
- Script may be initializing - wait a few seconds
- Check browser console for error messages
- Try refreshing the page

### Debug Mode
Enable console logging by opening browser developer tools (F12) and checking the Console tab.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes to `njoyn-ats-navigator.user.js`
4. Test thoroughly on Njoyn ATS systems
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex functionality
- Test on multiple Njoyn ATS implementations
- Ensure backward compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This userscript is provided as-is for educational and productivity purposes. Users are responsible for:
- Ensuring compliance with their organization's IT policies
- Respecting terms of service of ATS platforms
- Using the script responsibly and ethically

## 🔗 Related Projects

- [Tampermonkey](https://www.tampermonkey.net/) - Userscript manager
- [Greasemonkey](https://www.greasespot.net/) - Alternative userscript manager for Firefox

## 📞 Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/BlockchainHB/atsnavigation/issues)
- **Documentation**: Check the [Wiki](../../wiki) for detailed guides
- **Community**: Join discussions in the repository

---

Made with ❤️ for HR professionals and recruiters