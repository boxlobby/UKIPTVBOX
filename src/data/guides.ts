export interface GuideStep {
  title: string;
  body: string;
}

export interface Guide {
  slug: string;
  icon: string;
  title: string;
  device: string;
  summary: string;
  readMinutes: number;
  recommendedApp: string;
  requirements: string[];
  steps: GuideStep[];
  tips: string[];
}

export const guides: Guide[] = [
  {
    slug: 'smart-tv',
    icon: 'tv',
    title: 'How to install IPTV on a Smart TV (Samsung, LG, Sony)',
    device: 'Smart TV',
    summary:
      'Install IPTV on Samsung Tizen, LG WebOS, Sony and Android TVs using XOTT, IBO Player Pro, Hot Player, Bob Player, Smart IPTV, Set IPTV or Smarters Player Lite, free trials included.',
    readMinutes: 8,
    recommendedApp: 'XOTT (free), IBO Player Pro, Hot Player or Bob Player',
    requirements: [
      'Smart TV connected to the internet (Wi-Fi or Ethernet)',
      'Your IPTV activation details (sent by us on WhatsApp / email)',
      'A stable connection of at least 15 Mbps for HD, 25 Mbps for 4K',
    ],
    steps: [
      {
        title: 'Open the app store on your TV',
        body: 'Turn on your TV and open the app store, Samsung Smart Hub, LG Content Store or Google Play on Android TVs. Search for a compatible IPTV player such as "Smart IPTV", "IBO Player" or "Set IPTV" and install it. All three are free to download.',
      },
      {
        title: 'Find your TV\'s MAC address',
        body: 'Launch the app you just installed. On the welcome screen you will see a MAC address (usually starting 00:1A:...). Write it down or take a photo, you\'ll need to share this with us so we can activate your playlist.',
      },
      {
        title: 'Send us your MAC address',
        body: 'Message us on WhatsApp with your MAC address. Our team will upload your personal playlist to your device within a few minutes and confirm once it\'s live, no manual URL typing required.',
      },
      {
        title: 'Reload the app and start streaming',
        body: 'Close the IPTV app fully, then re-open it. Your channels, movie library and series will load automatically. Use the category menu on the left to jump between UK, USA, sports and more.',
      },
    ],
    tips: [
      'If channels buffer, switch from Wi-Fi to Ethernet, it makes a huge difference on 4K streams.',
      'Older Samsung/LG TVs (pre-2016) may not support all IPTV apps, use a Fire Stick instead for the best experience.',
    ],
  },
  {
    slug: 'mobile-tablet',
    icon: 'smartphone',
    title: 'How to install IPTV on Android and iOS (phone or tablet)',
    device: 'Mobile & Tablet',
    summary:
      'Watch live UK TV, sports and movies on the go. This guide covers Android phones, iPhones, iPads and Android tablets.',
    readMinutes: 3,
    recommendedApp: 'IPTV Smarters Pro or TiviMate (Android) / IPTV Smarters Pro (iOS)',
    requirements: [
      'Android 6+ or iOS 13+ device',
      'A Google Play or App Store account',
      'Your IPTV login credentials from us (username, password, server URL)',
    ],
    steps: [
      {
        title: 'Install IPTV Smarters Pro',
        body: 'Open Google Play (Android) or the App Store (iOS) and search for "IPTV Smarters Pro". Install the free app, it\'s the most popular IPTV player for mobile and works on both platforms.',
      },
      {
        title: 'Choose "Login with Xtream Codes API"',
        body: 'Open the app, accept the terms and pick "Add New User". On the next screen tap "Login with Xtream Codes API", this is the fastest login method and the one our activation details use.',
      },
      {
        title: 'Enter your credentials',
        body: 'Enter any name (e.g. "IPTV UK"), then paste the username, password and server URL we sent you. Tap Add User. The app will connect and download your playlist automatically.',
      },
      {
        title: 'Start streaming',
        body: 'You\'ll land on a home screen with Live TV, Movies, Series and TV Guide tiles. Tap any category and enjoy, everything is optimised for touch and works over 4G, 5G or Wi-Fi.',
      },
    ],
    tips: [
      'On iOS, if the app is missing from the App Store, install "Smarters Player Lite" instead, it works the same way.',
      'Enable "External Player" in settings and choose VLC if you experience playback issues on older devices.',
    ],
  },
  {
    slug: 'firestick',
    icon: 'monitor',
    title: 'How to install IPTV on Amazon Fire Stick / Fire TV Cube',
    device: 'Fire Stick & Cube',
    summary:
      'Fire Stick is by far the most popular way to run IPTV in the UK. This guide shows you how to sideload the IPTV Smarters app in under 5 minutes.',
    readMinutes: 5,
    recommendedApp: 'IPTV Smarters Pro (sideloaded via Downloader)',
    requirements: [
      'Amazon Fire Stick, Fire Stick 4K, Fire TV Cube or Fire TV Stick Lite',
      'Your IPTV credentials from us',
      'A registered Amazon account signed in on the Fire Stick',
    ],
    steps: [
      {
        title: 'Enable apps from unknown sources',
        body: 'From the Fire Stick home screen go to Settings → My Fire TV → Developer Options → Install unknown apps. Find "Downloader" in the list and toggle it ON. (On older devices this may be labelled "Apps from Unknown Sources".)',
      },
      {
        title: 'Install the Downloader app',
        body: 'Return home, press the search icon (top left) and type "Downloader". Install the orange Downloader app by AFTVnews, it\'s free and Amazon-approved.',
      },
      {
        title: 'Download IPTV Smarters Pro',
        body: 'Open Downloader, click the URL bar and type: www.iptvsmarters.com, press Go. Choose the "IPTV Smarters Pro" APK and hit Download. When it finishes, click Install.',
      },
      {
        title: 'Log in with your details',
        body: 'Open IPTV Smarters, tap "Add New User" → "Login with Xtream Codes API", then enter the username, password and server URL we sent you. Save, your channels load instantly.',
      },
      {
        title: 'Pin the app to your home screen',
        body: 'Back on the Fire TV home screen, long-press the IPTV Smarters icon and choose "Move to front" so you can launch it in one click every time.',
      },
    ],
    tips: [
      'For the smoothest 4K playback, use a Fire Stick 4K Max, the standard Lite can struggle with high-bitrate streams.',
      'If you lose picture but keep sound, restart the app and choose the "MX Player" external decoder in settings.',
    ],
  },
  {
    slug: 'windows-mac',
    icon: 'laptop',
    title: 'How to watch IPTV on Windows PC or Mac',
    device: 'Windows & Mac',
    summary:
      'Turn any laptop or desktop into a TV with a free desktop IPTV player. Works on Windows 10/11 and macOS Ventura or newer.',
    readMinutes: 3,
    recommendedApp: 'VLC Media Player or MyIPTV Player (Windows) / IINA (Mac)',
    requirements: [
      'A Windows 10/11 PC or Mac running macOS 12+',
      'Your M3U playlist URL from us',
      'A stable broadband connection',
    ],
    steps: [
      {
        title: 'Install a compatible player',
        body: 'Windows users: install the free "MyIPTV Player" from the Microsoft Store, or use VLC Media Player. Mac users: use VLC or IINA, both are free open-source players that handle IPTV streams natively.',
      },
      {
        title: 'Open the player and add a new playlist',
        body: 'In MyIPTV Player click Settings → "Add new playlist" → "Remote M3U file". In VLC, use Media → Open Network Stream. Paste the M3U URL we sent you in your welcome message.',
      },
      {
        title: 'Load the channels',
        body: 'Click Save / Play. The player downloads your channel list within seconds. You\'ll see UK, sports, movies and series categories on the left, click one to start watching.',
      },
      {
        title: 'Optional: connect to an external monitor',
        body: 'Both apps support full-screen playback, hit F11 (Windows) or Cmd+Ctrl+F (Mac). If you\'re using an HDMI cable to a TV, the audio will follow the video automatically.',
      },
    ],
    tips: [
      'VLC users: enable hardware decoding (Preferences → Input/Codecs → Hardware-accelerated decoding: Automatic) for smoother 4K playback.',
      'If a channel says "unable to open" in VLC, right-click it and pick "Play with external player", the stream is fine, it\'s a codec quirk.',
    ],
  },
  {
    slug: 'apple-tv',
    icon: 'apple',
    title: 'How to install IPTV on Apple TV (4K & HD)',
    device: 'Apple TV',
    summary:
      'Enjoy the polished tvOS experience with premium IPTV. Works on Apple TV HD and every Apple TV 4K generation.',
    readMinutes: 4,
    recommendedApp: 'IPTV Smarters Pro or iPlayTV (tvOS)',
    requirements: [
      'Apple TV HD (4th gen) or any Apple TV 4K',
      'Your Apple ID signed in on the device',
      'IPTV credentials from us',
    ],
    steps: [
      {
        title: 'Open the tvOS App Store',
        body: 'From the Apple TV home screen open the App Store and search for "Smarters Player Lite" or "iPlayTV". Both are official IPTV players on tvOS. Install your preferred one.',
      },
      {
        title: 'Choose the Xtream Codes login',
        body: 'Open the app and pick "Add New User" or "Add Playlist". Select "Login with Xtream Codes API", this is the recommended method as it auto-refreshes your channel list and EPG.',
      },
      {
        title: 'Enter your details',
        body: 'Type a nickname (e.g. Living Room), then enter the username, password and server URL we sent you. Save. Your Apple TV connects and loads all channels within a few seconds.',
      },
      {
        title: 'Enjoy the polished interface',
        body: 'The tvOS player is one of the smoothest around, 4K HDR, Dolby audio and a proper TV guide are all supported. Use the Siri Remote touchpad to swipe through categories quickly.',
      },
    ],
    tips: [
      'For paid apps (iPlayTV) you pay Apple once, the subscription with us stays separate.',
      'Turn on "Match Content" in Apple TV settings → Video and Audio for automatic HDR/frame-rate switching on films.',
    ],
  },
  {
    slug: 'mag-box',
    icon: 'router',
    title: 'How to set up IPTV on a MAG Box (250, 254, 322, 420, 524)',
    device: 'MAG Box',
    summary:
      'MAG boxes are plug-and-play once your MAC address is registered on our portal. This guide walks through the whole process.',
    readMinutes: 4,
    recommendedApp: 'Built-in MAG portal',
    requirements: [
      'Any MAG box (250, 254, 256, 322, 324, 349, 420, 424, 522, 524)',
      'HDMI cable and internet connection',
      'The MAC address printed on the back sticker of your MAG',
    ],
    steps: [
      {
        title: 'Connect and boot your MAG',
        body: 'Plug the MAG into your TV via HDMI, connect Ethernet (recommended) or Wi-Fi, and power on. Wait for the main "Home Menu" screen to appear.',
      },
      {
        title: 'Send us your MAC address',
        body: 'Flip the box over, you\'ll see a sticker with a MAC address (format 00:1A:79:XX:XX:XX). WhatsApp us this MAC and your order name so we can whitelist it on our server.',
      },
      {
        title: 'Enter the portal URL',
        body: 'On the MAG: Settings → System settings → Servers → Portals. In Portal 1, name it "IPTV UK" and paste the portal URL we sent you. Save the changes and press EXIT.',
      },
      {
        title: 'Restart the portal',
        body: 'From the home menu, click the OK button on the remote to restart the portal. Your channels appear grouped by category, UK, entertainment, sports, movies, series and more.',
      },
    ],
    tips: [
      'Always use Ethernet on MAG boxes, the built-in Wi-Fi antennas are weak and struggle with HD/4K bitrates.',
      'If the portal says "Loading" indefinitely, double-check the MAC you sent us matches the sticker exactly (case-sensitive on the letters).',
    ],
  },
  {
    slug: 'nvidia-shield',
    icon: 'box',
    title: 'How to install IPTV on Nvidia Shield TV & Shield Pro',
    device: 'Nvidia Shield',
    summary:
      'Nvidia Shield is the most powerful Android TV device on the market, a perfect match for high-bitrate 4K IPTV.',
    readMinutes: 3,
    recommendedApp: 'TiviMate or IPTV Smarters Pro',
    requirements: [
      'Nvidia Shield TV (2019) or Shield TV Pro',
      'A Google account signed into the Shield',
      'Your IPTV credentials from us',
    ],
    steps: [
      {
        title: 'Install TiviMate from the Play Store',
        body: 'From the Shield home screen open the Google Play Store, search "TiviMate" and install it. TiviMate is the gold standard IPTV player for Android TV, a free version is available.',
      },
      {
        title: 'Add a new playlist',
        body: 'Open TiviMate → "Add Playlist" → "Enter URL". Paste the M3U link we sent you (or choose Xtream Codes and enter username/password/URL). Press Next.',
      },
      {
        title: 'Choose an EPG source',
        body: 'When prompted, tap "Use TiviMate EPG", the electronic programme guide is included with your subscription and populates automatically for every channel.',
      },
      {
        title: 'Customise and stream',
        body: 'TiviMate lets you sort channels, hide categories, choose a skin and set default audio. Once configured, hit OK on the Shield remote from anywhere to bring up the on-screen guide.',
      },
    ],
    tips: [
      'Upgrade to TiviMate Premium (one-off small fee) to unlock multi-playlist support and reminders, well worth it.',
      'Enable "Match content frame rate" in Shield settings for buttery-smooth sports playback.',
    ],
  },
  {
    slug: 'enigma2-formuler',
    icon: 'satellite',
    title: 'How to install IPTV on Enigma2 & Formuler boxes',
    device: 'Enigma2 & Formuler',
    summary:
      'For power users. Load your IPTV subscription directly into the Enigma2 bouquet system or a Formuler box for hybrid satellite + IPTV viewing.',
    readMinutes: 6,
    recommendedApp: 'Enigma2 bouquet upload / MYTVOnline 3 (Formuler)',
    requirements: [
      'Formuler Z10 / Z11 / CC, or any Enigma2 box (Vu+, Zgemma, Octagon)',
      'FTP client on your PC (FileZilla, WinSCP)',
      'Your Enigma2 bouquet file OR portal URL from us',
    ],
    steps: [
      {
        title: 'Enable FTP on your Enigma2 box',
        body: 'On the box: Menu → Setup → System → Network → confirm FTP is enabled and note the IP address shown. Default login for most images: root / no password.',
      },
      {
        title: 'Upload your bouquet file',
        body: 'On your PC open FileZilla, connect to the box IP over SFTP, and drop the userbouquet.iptv-uk.tv file we sent you into /etc/enigma2/. Also append the include line we provide to bouquets.tv.',
      },
      {
        title: 'Reload settings',
        body: 'Back on the box: Menu → Standby / Restart → Restart GUI. When it reboots, press the TV button on the remote, you\'ll see a new "IPTV UK" bouquet listed.',
      },
      {
        title: 'Formuler users: use MYTVOnline 3 instead',
        body: 'If you have a Formuler Z10 or newer, skip the FTP path, launch MYTVOnline 3 on the box, choose "Add Portal", select Xtream Codes and enter the username, password and URL from us. Far simpler.',
      },
    ],
    tips: [
      'On Enigma2, keep only one active IPTV bouquet to avoid channel numbering clashes with your existing FTA / satellite channels.',
      'Formuler owners should install "OTT Navigator" alongside MYTVOnline as a backup player, dual-app setups avoid downtime.',
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
