"use client";

import React, { useState } from "react";

interface AppicLogoProps {
  className?: string;
  isDarkMode?: boolean;
}

export const AppicLogo: React.FC<AppicLogoProps> = ({ className = "", isDarkMode = false }) => {
  const appicFill = isDarkMode ? "#FFFFFF" : "#18181B"; // White in dark mode, zinc-900 in light mode
  const redFill = "#DE0A26"; // Vibrant primary red for triangle and "Softwares"
  
  return (
    <svg 
      width="251" 
      height="55" 
      viewBox="0 0 251 55" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`h-9 w-auto ${className}`}
    >
      {/* Logo dot */}
      <path d="M30.3088 37.2041C27.7644 37.8518 25.6418 39.9446 25.1276 42.3363C24.7717 43.9183 25.1804 45.9861 26.1032 47.2941C27.4084 49.1501 29.3332 50.1965 31.6404 50.321C33.8684 50.4332 35.4241 49.8601 36.9929 48.3653C37.6126 47.7799 38.1267 47.157 38.3509 46.7086C39.722 44.0055 39.2078 41.0781 37.0061 38.9978C35.2263 37.3162 32.616 36.6186 30.3088 37.2041Z" fill={redFill}/>
      {/* Logo triangle */}
      <path d="M30.1906 0.130917C29.3205 0.404965 28.7932 0.716388 28.0549 1.36414C27.3693 1.98698 26.8288 2.73438 26.631 3.31985C26.5256 3.65618 1.72706 44.1781 1.05469 45.1248C0.14502 46.3954 0 46.8438 0 48.4258C0 49.7836 0.0263673 49.8957 0.421878 50.6805C0.949225 51.6895 2.12257 52.7857 3.19045 53.259C3.88919 53.5705 4.08694 53.5954 5.53715 53.5954C7.06645 53.5954 7.15874 53.5829 7.98931 53.1968C8.52456 52.9378 9.01383 52.6016 9.43952 52.2002C9.82184 51.8016 13.6583 45.6521 20.9489 33.7517C31.8386 15.9759 31.8913 15.9012 32.0759 16.25C32.8669 17.6701 53.3016 51.4528 53.5785 51.7891C54.1322 52.4494 55.266 53.1345 56.2679 53.4334C57.5426 53.808 58.9174 53.7359 60.1402 53.2302C61.3631 52.7246 62.3521 51.8193 62.9257 50.6805C63.4003 49.7711 63.4135 49.7213 63.4135 48.3137C63.4135 46.9435 63.3871 46.8314 63.0048 46.1213C62.7807 45.7102 60.0912 41.2258 57.0326 36.1559C45.7737 17.5579 37.4021 3.61881 36.9802 2.84649C36.4147 1.79926 35.5027 0.955113 34.383 0.442336C33.5657 0.0686326 33.3811 0.0312624 32.1023 0.00634882C31.2321 -0.0185647 30.5202 0.0312624 30.1906 0.130917Z" fill={redFill}/>
      
      {/* "Appic" - A */}
      <path d="M74.4374 31.4336C74.2924 31.745 72.3544 35.806 70.1264 40.4648C67.8983 45.1236 66.0526 49.0351 66.0131 49.1472C65.9472 49.3589 66.079 49.3714 67.6347 49.3714H69.3354L70.245 47.4032C70.746 46.3319 71.2206 45.3728 71.2865 45.2856C71.392 45.1735 72.183 45.1361 74.7934 45.161C78.063 45.1984 78.1684 45.2108 78.3003 45.46C78.3662 45.6094 78.8144 46.5437 79.289 47.5402L80.146 49.3589L81.8862 49.3714H83.6265L83.2573 48.5866C81.6885 45.298 74.8857 31.2094 74.8066 31.0599C74.7143 30.9229 74.6352 31.0101 74.4374 31.4336ZM75.4262 39.5928C75.6503 40.0662 76.0459 40.9008 76.3095 41.424L76.771 42.3956H72.6972L72.8818 41.9845C72.9872 41.7728 73.3827 40.9382 73.7519 40.1534C74.1342 39.3686 74.4902 38.5838 74.5561 38.4219L74.6879 38.1105L74.8461 38.4219C74.9384 38.5838 75.2021 39.107 75.4262 39.5928Z" fill={appicFill}/>
      {/* "Appic" - p */}
      <path d="M90.1648 37.9112C89.6879 38.1113 89.2368 38.362 88.82 38.6586L88.1213 39.1569V37.9112H84.8254L84.8517 46.1576L84.8913 54.4164L86.5129 54.4538L88.1213 54.4912V48.0759L88.5564 48.4621C88.7805 48.6863 89.3474 49.0227 89.8088 49.222C91.8391 50.1313 94.0803 49.7452 95.7415 48.213C96.9807 47.0669 97.5212 46.0704 97.7586 44.451C98.1409 41.8476 96.7302 39.2441 94.3308 38.123C93.553 37.7617 93.342 37.7244 92.1423 37.6995C91.0876 37.6745 90.6921 37.7119 90.1648 37.9112ZM92.3401 40.7887C93.6453 41.3493 94.3704 42.3583 94.3572 43.6413C94.3572 44.5631 94.0803 45.1984 93.3816 45.8586C92.7883 46.4317 92.2873 46.6434 91.4304 46.7182C90.3098 46.8178 89.6374 46.5936 88.8596 45.8462C88.1213 45.1486 87.7917 44.3763 87.8313 43.4669C87.9104 41.3991 90.3625 39.9417 92.3401 40.7887Z" fill={appicFill}/>
      {/* "Appic" - p */}
      <path d="M105.643 37.9479C104.865 38.2593 104.233 38.633 103.943 38.9693C103.652 39.2932 103.547 39.1811 103.547 38.5333V37.9105H100.383V54.4904L102.005 54.4531L103.613 54.4157L103.652 51.3264L103.679 48.2371L104.312 48.6731C105.393 49.4081 106.21 49.6697 107.581 49.6697C108.702 49.6697 108.847 49.6448 109.77 49.2212C110.717 48.767 111.532 48.1003 112.144 47.2794C112.755 46.4585 113.144 45.5085 113.277 44.5126C113.567 42.2953 112.868 40.4517 111.207 38.9942C110.139 38.0475 109.282 37.7361 107.7 37.6863C106.566 37.6613 106.276 37.6987 105.643 37.9479ZM107.964 40.8254C108.689 41.1368 109.414 41.8344 109.691 42.4697C109.954 43.0676 109.915 44.3506 109.625 44.9486C109.308 45.5963 108.32 46.4558 107.687 46.6178C107 46.7922 106.277 46.7922 105.59 46.6178C104.799 46.406 103.758 45.3721 103.494 44.525C103.217 43.653 103.231 43.4164 103.547 42.6067C104.219 40.9126 106.276 40.078 107.964 40.8254Z" fill={appicFill}/>
      {/* "Appic" - i */}
      <path d="M116 43.6411V49.3712H119.296L119.27 43.666L119.23 37.9733L117.622 37.9359L116 37.8986V43.6411Z" fill={appicFill}/>
      {/* "Appic" - dot on i */}
      <circle cx="117.5" cy="35.5" r="1.5" fill={appicFill}/>
      {/* "Appic" - c */}
      <path d="M125.155 37.9473C121.411 39.1556 119.657 43.4905 121.648 46.6047C122.215 47.5016 123.652 48.7597 124.562 49.1708C125.127 49.3996 125.72 49.5587 126.328 49.6441C127.568 49.8185 128.939 49.5943 130.257 49.0089L131.101 48.6352V46.8165C131.101 44.8483 131.14 44.923 130.376 45.4587C129.677 45.9569 128.24 46.5175 127.515 46.5922C126.579 46.6794 125.867 46.4801 125.195 45.932C123.784 44.7985 123.612 42.9798 124.786 41.7216C126.117 40.2891 128.345 40.314 130.679 41.7715L131.101 42.0455V38.5327L130.613 38.296C129.123 37.586 126.75 37.4365 125.155 37.9473Z" fill={appicFill}/>

      {/* "Softwares" - S */}
      <path d="M144.679 31.7579C143.937 31.9468 143.245 32.2805 142.648 32.7375C142.05 33.1945 141.561 33.7646 141.211 34.4112C140.842 35.1212 140.79 35.3454 140.79 36.2299C140.79 37.1143 140.842 37.3261 141.238 38.0735C141.541 38.6434 141.937 39.1647 142.411 39.6181C143.136 40.2908 143.65 40.5524 146.801 41.9351C148.397 42.6202 149.214 43.5545 149.201 44.6756C149.174 46.2327 147.381 47.1545 145.443 46.6064C144.718 46.4071 143.756 45.5475 143.255 44.6507L142.833 43.9157L141.937 44.1524C141.449 44.2894 140.79 44.4513 140.46 44.5385C140.46 44.6133 139.814 44.7129 139.761 44.7628C139.59 44.8998 140.46 46.5815 141.132 47.4161C143.505 50.4057 148.225 50.8666 150.875 48.3628C152.919 46.432 153.13 43.6417 151.402 41.3621C150.651 40.378 149.544 39.6555 147.118 38.5468C144.692 37.4382 144.151 37.0271 144.151 36.2922C144.151 35.2707 145.457 34.5482 147.012 34.7226C147.896 34.8223 148.252 34.9967 149.082 35.7191C149.464 36.0555 149.794 36.2423 149.886 36.1925C150.453 35.8686 152.193 34.461 152.193 34.3115C152.193 34.0001 150.677 32.742 149.794 32.3434C148.172 31.5835 146.234 31.3593 144.679 31.7579Z" fill={redFill}/>
      {/* "Softwares" - o */}
      <path d="M158.195 37.9489C156.006 38.7337 154.266 40.6769 153.884 42.7572C153.185 46.6312 157.18 50.306 161.385 49.6458C162.677 49.4465 163.837 48.861 164.853 47.8769C167.687 45.1613 167.41 41.2499 164.18 38.8831C162.981 37.9987 162.176 37.7496 160.436 37.6997C159.184 37.6748 158.88 37.6997 158.195 37.9489ZM161.636 40.9634C162.216 41.1876 162.981 41.8603 163.284 42.4084C163.587 42.9814 163.613 44.0776 163.35 44.688C163.06 45.3482 162.269 46.0831 161.53 46.3821C159.975 47.0174 157.984 46.2575 157.325 44.7876C156.217 42.371 158.986 39.9171 161.636 40.9634Z" fill={redFill}/>
      {/* "Softwares" - f */}
      <path d="M172.169 31.7329C171.392 32.0692 170.6 32.854 170.218 33.6637C169.981 34.1495 169.928 34.5232 169.889 36.0678L169.836 37.9114H167.753V40.7765H169.862V49.3717H173.026V40.7765H176.19V37.9114H173.026V36.6907C173.026 35.4201 173.171 34.6976 173.448 34.5232C173.83 34.299 174.569 34.4235 175.32 34.8595C175.742 35.0962 176.111 35.2955 176.138 35.2955C176.164 35.2955 176.19 34.5606 176.19 33.6637V32.0443L175.465 31.7329C174.463 31.3218 173.105 31.3218 172.169 31.7329Z" fill={redFill}/>
      {/* "Softwares" - t */}
      <path d="M178.695 36.3541V37.9112H176.717V40.7762H178.695V49.3714H181.859V40.7762H184.232V37.9112H181.859V34.797H178.695V36.3541Z" fill={redFill}/>
      {/* "Softwares" - w */}
      <path d="M192.878 38.6202C192.457 39.5669 191.758 41.1365 191.323 42.1206L190.532 43.9019L189.517 41.9337C188.95 40.85 188.277 39.5047 187.987 38.9316L187.486 37.9102H185.983C185.166 37.9102 184.494 37.9476 184.494 37.9974C184.494 38.0597 184.929 38.9316 185.456 39.9656C185.983 40.987 187.368 43.7026 188.515 45.9697C189.675 48.2493 190.65 50.1178 190.69 50.1178C190.73 50.1178 191.402 48.6479 192.193 46.8666C192.984 45.0853 193.683 43.6777 193.735 43.7275C193.788 43.7773 194.474 45.2721 195.252 47.041C196.029 48.8099 196.702 50.205 196.754 50.1552C196.807 50.1054 197.611 48.5358 198.534 46.6922C199.47 44.8362 200.789 42.2327 201.474 40.8998C202.147 39.5669 202.766 38.3462 202.832 38.1842L202.951 37.8977L201.421 37.9351L199.905 37.9725L198.402 40.9496C197.19 43.3663 196.886 43.877 196.781 43.6901C196.715 43.5531 196.016 42.0209 195.238 40.277C194.461 38.533 193.788 37.0507 193.735 37.0008C193.669 36.951 193.287 37.6735 192.878 38.6202Z" fill={redFill}/>
      {/* "Softwares" - a */}
      <path d="M207.3 37.7734C205.981 38.1596 204.465 39.3804 203.753 40.6385C203.09 41.8088 202.828 43.1454 203.005 44.4625C203.183 45.7796 203.79 47.0118 204.742 47.988C206.759 50.0558 209.884 50.2925 212.138 48.5486L212.705 48.1126V49.3707H216.001V37.9105H212.705V39.1811L212.033 38.7077C210.925 37.9478 210.042 37.6613 208.75 37.6738C208.264 37.6652 207.779 37.6986 207.3 37.7734ZM211.031 40.8627C211.664 41.0994 212.613 42.0959 212.811 42.7437C212.999 43.3287 213.002 43.953 212.819 44.5395C212.636 45.1261 212.276 45.6493 211.782 46.0447C211.044 46.6302 210.503 46.7921 209.409 46.7299C208.658 46.6925 208.394 46.6178 207.933 46.3063C206.39 45.2973 205.955 43.3915 206.931 42.0212C207.867 40.7257 209.449 40.2773 211.031 40.8627Z" fill={redFill}/>
      {/* "Softwares" - r */}
      <path d="M223.82 37.8488C223.582 37.936 223.134 38.2474 222.805 38.5464L222.198 39.0696V37.9111H219.034V49.3713H222.198V46.2198C222.198 44.5007 222.264 42.8315 222.343 42.5201C222.501 41.8474 222.989 41.2246 223.556 40.9505C223.978 40.7388 225.072 40.6765 225.586 40.826C225.863 40.9132 226.008 40.5893 226.76 38.1353C226.812 37.9734 226.72 37.8737 226.483 37.7865C225.982 37.6121 224.308 37.6371 223.82 37.8488Z" fill={redFill}/>
      {/* "Softwares" - e */}
      <path d="M231.732 37.9605C230.743 38.3093 230.374 38.5335 229.556 39.256C225.733 42.6318 227.658 48.8104 232.8 49.6325C234.571 49.8951 236.383 49.5314 237.888 48.6111C238.745 48.063 239.84 46.9169 239.655 46.7675C239.589 46.7176 239.049 46.319 238.442 45.8955L237.348 45.1107L236.887 45.609C236.404 46.1254 235.775 46.5007 235.075 46.6905C234.374 46.8803 233.63 46.8768 232.931 46.6803C232.048 46.4187 231.046 45.5965 230.796 44.9114L230.651 44.5128H240.262V43.9149C240.262 43.0553 239.919 41.6851 239.51 40.9003C239.009 39.9038 237.598 38.6332 236.478 38.1349C235.647 37.7612 235.463 37.7238 234.065 37.6989C232.734 37.6615 232.444 37.6989 231.732 37.9605ZM235.12 40.7882C235.753 41.0623 236.135 41.3363 236.32 41.6726C236.438 41.8844 236.28 41.8969 233.775 41.8969H231.112L231.626 41.3986C232.076 40.9765 232.65 40.6924 233.273 40.5835C233.897 40.4746 234.54 40.546 235.12 40.7882Z" fill={redFill}/>
      {/* "Softwares" - s */}
      <path d="M244.017 37.9112C242.29 38.559 241.275 40.3527 241.763 41.9223C242.132 43.1182 242.989 43.8157 245.309 44.7624C245.78 44.9411 246.235 45.1578 246.667 45.4102C247.537 46.0704 246.443 47.0919 245.151 46.8178C244.94 46.7804 244.492 46.5438 244.162 46.3071L243.569 45.8836L242.316 46.469L241.064 47.0545L241.288 47.4157C241.67 48.0261 242.857 48.9978 243.648 49.3465C244.742 49.8199 246.337 49.8199 247.392 49.3465C249.027 48.6365 249.884 47.4656 249.884 45.9583C249.884 44.887 249.607 44.2766 248.829 43.5666C248.302 43.0683 247.761 42.7694 245.757 41.8974C244.795 41.4739 244.439 41.0628 244.729 40.7389C245.124 40.278 246.298 40.415 247.221 41.0254L247.801 41.4116L248.341 40.9756C248.644 40.7389 249.159 40.3278 249.475 40.0538L250.068 39.568L249.304 39.0074C247.972 38.0233 247.234 37.7368 245.863 37.6995C244.927 37.6745 244.531 37.7119 244.017 37.9112Z" fill={redFill}/>
    </svg>
  );
};

interface NavLink {
  name: string;
  desc: string;
}

interface NavItem {
  label: string;
  hasDropdown: boolean;
  links?: NavLink[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "AI/ML",
    hasDropdown: true,
    links: [
      { name: "Generative AI Development", desc: "Build state-of-the-art LLMs & custom AI models" },
      { name: "Machine Learning Solutions", desc: "Train smart predictive intelligence architectures" },
      { name: "Predictive Analytics", desc: "Data insights that forecast market and user trends" },
      { name: "Natural Language Processing", desc: "Speech, voice, and conversational agent tech" }
    ]
  },
  {
    label: "Services",
    hasDropdown: true,
    links: [
      { name: "Mobile App Development", desc: "High performance iOS, Android & cross-platform apps" },
      { name: "Web App Development", desc: "Sleek, responsive, and secure custom web platforms" },
      { name: "UI/UX Experience Design", desc: "Stunning, human-centric visual interfaces" },
      { name: "Dedicated Tech Teams", desc: "Scale up your project with world-class engineers" }
    ]
  },
  {
    label: "Industries",
    hasDropdown: true,
    links: [
      { name: "Healthcare & Fitness", desc: "HIPAA-compliant custom medical platforms & apps" },
      { name: "Fintech & Banking", desc: "Secure digital banking, ledger, and payment flows" },
      { name: "E-commerce & Retail", desc: "High conversion shopping apps & storefront systems" },
      { name: "Logistics & Supply Chain", desc: "Real-time dispatch, route optimization, & ERPs" }
    ]
  },
  {
    label: "Platform",
    hasDropdown: true,
    links: [
      { name: "iOS Native Systems", desc: "Premium, Apple-native Swift app experiences" },
      { name: "Android Native Systems", desc: "Robust, Kotlin-based Android native engineering" },
      { name: "Flutter & React Native", desc: "Cost-efficient, high performance cross-platform builds" },
      { name: "Enterprise Cloud Architectures", desc: "Scale securely with AWS, GCP, and Azure" }
    ]
  },
  {
    label: "Hire Talent",
    hasDropdown: true,
    links: [
      { name: "Hire React Native Developers", desc: "Elite mobile app cross-platform specialists" },
      { name: "Hire Flutter Developers", desc: "Skilled specialists for fast cross-platform MVPs" },
      { name: "Hire Native App Engineers", desc: "Specialists in Swift, Objective-C, and Kotlin builds" },
      { name: "Hire Node.js Back-End Experts", desc: "Build secure, super-scalable backend APIs" }
    ]
  },
  {
    label: "Our Company",
    hasDropdown: true,
    links: [
      { name: "About Appic Softwares", desc: "Our journey, values, & custom software mission" },
      { name: "Our Process", desc: "How we go from wireframe to launch, step-by-step" },
      { name: "Join Our Team", desc: "Careers, open roles, and our engineering culture" },
      { name: "Case Studies & Work", desc: "A showcase of our recent high-growth builds" }
    ]
  },
  {
    label: "Blog",
    hasDropdown: false
  }
];

interface HeaderProps {
  isDarkMode?: boolean;
  isMuted?: boolean;
  setIsMuted?: (mute: boolean) => void;
}

export default function Header({ 
  isDarkMode = false, 
  isMuted = true, 
  setIsMuted 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (label: string) => {
    if (activeMobileDropdown === label) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(label);
    }
  };

  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between transition-all duration-300">
      
      {/* 1. Left: Brand Logo SVG (Perfect Color Adaptability) */}
      <div className="flex items-center gap-1 cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
        <AppicLogo isDarkMode={isDarkMode} />
      </div>

      {/* 2. Middle: Premium Corporate Navigation & Hover Dropdowns */}
      <nav className="hidden lg:flex items-center gap-7">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative group py-2">
            <button
              className={`flex items-center gap-1 text-[13.5px] font-semibold tracking-wide transition-all duration-300 outline-none select-none ${
                isDarkMode 
                  ? "text-zinc-300 group-hover:text-[#DE0A26]" 
                  : "text-zinc-700 group-hover:text-[#DE0A26]"
              }`}
            >
              {item.label}
              {item.hasDropdown && (
                <svg 
                  className={`w-3 h-3 text-zinc-400 group-hover:text-[#DE0A26] transition-transform duration-300 group-hover:rotate-180`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* Premium Glassmorphic Dropdown Panel */}
            {item.hasDropdown && item.links && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] rounded-2xl p-5 opacity-0 scale-95 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto border shadow-2xl flex flex-col gap-4 z-50 transform origin-top"
                style={{
                  background: isDarkMode 
                    ? "rgba(12, 12, 16, 0.92)" 
                    : "rgba(255, 255, 255, 0.94)",
                  borderColor: isDarkMode 
                    ? "rgba(63, 63, 70, 0.4)" 
                    : "rgba(228, 228, 231, 0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: isDarkMode 
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.12)"
                }}
              >
                {/* Visual arrow pointer */}
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent"
                  style={{
                    borderBottomColor: isDarkMode ? "rgba(12, 12, 16, 0.92)" : "rgba(255, 255, 255, 0.94)"
                  }}
                />

                <div className="flex flex-col gap-1.5">
                  {item.links.map((link) => (
                    <a
                      key={link.name}
                      href="#"
                      className={`group/item flex flex-col p-2.5 rounded-xl transition-all duration-200 ${
                        isDarkMode 
                          ? "hover:bg-white/5" 
                          : "hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {/* Red Dot indicator on hover */}
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DE0A26] scale-0 transition-transform duration-200 group-hover/item:scale-100" />
                        <span className={`text-[13px] font-bold tracking-wide transition-colors duration-200 ${
                          isDarkMode 
                            ? "text-zinc-200 group-hover/item:text-[#DE0A26]" 
                            : "text-zinc-800 group-hover/item:text-[#DE0A26]"
                        }`}>
                          {link.name}
                        </span>
                      </div>
                      <span className={`text-[11px] mt-0.5 ml-3 font-medium ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        {link.desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* 3. Right: CONTACT US Button & Interactive Features */}
      <div className="flex items-center gap-3.5">
        
        {/* Sound Equalizer (Elegant utility icons to preserve functionality) */}
        <div className={`hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full transition-all duration-300 border bg-zinc-50/80 border-zinc-200/50 backdrop-blur-md`}>          {/* Equalizer/Sound toggle */}
          {setIsMuted && (
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-end gap-[3px] h-3.5 w-5 hover:opacity-80 transition-opacity duration-300"
              title={isMuted ? "Unmute Showcase" : "Mute Showcase"}
            >
              <span className={`w-[2.5px] rounded-full transition-all duration-300 ${isDarkMode ? "bg-zinc-100" : "bg-zinc-800"} ${isMuted ? "h-1" : "h-3 animate-[pulse_1s_infinite_alternate]"}`} />
              <span className={`w-[2.5px] rounded-full transition-all duration-300 ${isDarkMode ? "bg-zinc-100" : "bg-zinc-800"} ${isMuted ? "h-2" : "h-2 animate-[pulse_0.8s_infinite_alternate_0.2s]"}`} />
              <span className={`w-[2.5px] rounded-full transition-all duration-300 ${isDarkMode ? "bg-zinc-100" : "bg-zinc-800"} ${isMuted ? "h-1" : "h-3.5 animate-[pulse_1.2s_infinite_alternate_0.1s]"}`} />
              <span className={`w-[2.5px] bg-[#DE0A26] rounded-full transition-all duration-300 ${isMuted ? "h-1.5" : "h-2.5 animate-[pulse_0.9s_infinite_alternate_0.3s]"}`} />
            </button>
          )}
        </div>

        {/* Corporate red CONTACT US button (looks identical to the provided screenshot) */}
        <button 
          className="hidden lg:block relative px-6 py-2.5 rounded-full bg-[#DE0A26] hover:bg-[#B2081C] text-white text-[11px] font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-red-950/20 hover:scale-[1.04] active:scale-[0.98] outline-none"
        >
          Contact Us
        </button>

        {/* Mobile menu toggle button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden flex items-center justify-center p-2 rounded-full border transition-all duration-300 ${
            isDarkMode 
              ? "border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-200" 
              : "border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800"
          }`}
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 4. Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div 
          className="absolute top-[72px] left-4 right-4 rounded-2xl p-5 border shadow-2xl flex flex-col gap-4 lg:hidden z-50 transition-all duration-300 max-h-[80vh] overflow-y-auto"
          style={{
            background: isDarkMode ? "rgba(12, 12, 16, 0.98)" : "rgba(255, 255, 255, 0.98)",
            borderColor: isDarkMode ? "rgba(63, 63, 70, 0.6)" : "rgba(228, 228, 231, 0.9)",
            backdropFilter: "blur(20px)"
          }}
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b last:border-0 py-1.5" style={{ borderColor: isDarkMode ? "rgba(63, 63, 70, 0.2)" : "rgba(228, 228, 231, 0.4)" }}>
                <button
                  onClick={() => item.hasDropdown && toggleMobileDropdown(item.label)}
                  className={`w-full flex items-center justify-between py-2 text-[14px] font-bold ${
                    isDarkMode ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg 
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                        activeMobileDropdown === item.label ? "rotate-180" : ""
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {item.hasDropdown && item.links && activeMobileDropdown === item.label && (
                  <div className="flex flex-col gap-2 pl-4 py-2">
                    {item.links.map((link) => (
                      <a
                        key={link.name}
                        href="#"
                        className="flex flex-col py-1.5"
                      >
                        <span className={`text-[12.5px] font-bold ${isDarkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {link.name}
                        </span>
                        <span className={`text-[10px] ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                          {link.desc}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Corporate red CONTACT US button for mobile */}
          <button 
            className="w-full mt-2 mb-2 py-3 rounded-full bg-[#DE0A26] hover:bg-[#B2081C] text-white text-[12px] font-bold tracking-widest uppercase transition-all duration-300 shadow-md outline-none"
          >
            Contact Us
          </button>

          {/* Sun/Moon & Equalizer inside mobile view */}
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: isDarkMode ? "rgba(63, 63, 70, 0.2)" : "rgba(228, 228, 231, 0.4)" }}>
            <span className={`text-[12px] font-bold ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>Utilities</span>
            <div className="flex items-center gap-3">


              {setIsMuted && (
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-full border ${
                    isDarkMode ? "border-zinc-800 text-zinc-200" : "border-zinc-200 text-zinc-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
