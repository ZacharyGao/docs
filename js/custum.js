var themeLiawn = {
    basicsStyle: {
        defaultTheme: "light",
        basicsFont: "Segoe UI, Microsoft YaHei",
        codeFont: "Consolas, Courier New, monospace",
        bodyFontSize: "16px",
        sidebarWidth: "250px",
        appNavHeight: "0px",
        fTocWidth: "250px",
        coverMaskOpacity: ".1"
    },
    switchStyle: {
        series: ["#42b983", "#42b983"],
        background: ["#fdfdfd", "#1c1c1c"],
        borderColor: ["#eeeeee", "#333"],
        textColor: ["#34495e", "#9a9a9a"],
        strongTextColor: ["#34495e", "#5983af"],
        codeBg: ["#f8f8f8", "#262626"],
        codeAreaBg: ["#272727", "#262626"],
        codeTextColor: ["#3ac1ff", "#c2c3c3"],
        codeHighlightColor: ["#d22778", "#d22778"],
        sidebarTextColor: ["#505d6b", "#888"],
        sidebarBg: ["#f7f7f7", "#212121"],
        fTocBg: ["#f8f8f8", "#212121"],
        fTocActiveBg: ["#d2f7e6", "#464646"],
        hrColor: ["#eeeeee", "#a9a9a9"],
        searchBg: ["#eeeeee", "#454545"],
        searchFocusBg: ["#fff", "#888888"],
        searchResultBg: ["#ebebeb", "#2E2E2E"]
    },
    floatingToc: {
        open: true,
        scope: ".markdown-section",
        headings: 6
    },
    analysisDetailsCode: true,
    switchImage: {
        light: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="#ffffff" stroke="#34495e" stroke-width="2" stroke-linecap="round" 
        stroke-linejoin="round" class="feather feather-moon">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        dark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linecap="round" 
        stroke-linejoin="round" class="feather feather-sun">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    }
};


// Sets basic theme properties
function setThemeBasics() {
    $docsify.themeLiawn = Object.assign(themeLiawn, $docsify.themeLiawn || {});
    for (var [key, value] of Object.entries($docsify.themeLiawn.basicsStyle)) {
        document.documentElement.style.setProperty("--" + key, value);
    }
    $docsify.themeLiawn.basicsStyle.defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Applies styles based on the current theme
function applyCurrentThemeStyle(theme) {
    for (var [key, value] of Object.entries($docsify.themeLiawn.switchStyle)) {
        value = theme === "light" ? value[0] : value[1];
        document.documentElement.style.setProperty("--" + key, value);
    }
}

// Setup function for header customization
function customizeHeader() {
    // Example: Change header color based on theme
    var headerElement = document.querySelector('header');
    if (headerElement) {
        var headerColor = $docsify.themeLiawn.basicsStyle.defaultTheme === 'light' ? 'lightblue' : 'darkblue';
        headerElement.style.backgroundColor = headerColor;
    }
}


// Setup function for sidebar customization
function customizeSidebar() {
    // Example: Add a class to the sidebar based on theme
    var sidebarElement = document.querySelector('.sidebar');
    if (sidebarElement) {
        var themeClass = $docsify.themeLiawn.basicsStyle.defaultTheme === 'light' ? 'light-theme' : 'dark-theme';
        sidebarElement.classList.add(themeClass);
    }
}


// Setup function for content area
function setupContentArea() {
    // Example: Modify the content area's font size
    var contentArea = document.querySelector('.content');
    if (contentArea) {
        contentArea.style.fontSize = $docsify.themeLiawn.basicsStyle.bodyFontSize;
    }
}


// Switches theme between light and dark
function switchTheme() {
    const currentTheme = $docsify.themeLiawn.basicsStyle.defaultTheme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyCurrentThemeStyle(newTheme);
    $docsify.themeLiawn.basicsStyle.defaultTheme = newTheme;
}

// Initializes the floating table of contents
function initializeFloatingToc() {
    // Example: Initialize a floating table of contents
    var tocElement = document.querySelector('.toc');
    if (tocElement) {
        tocElement.style.position = 'fixed';
        tocElement.style.top = '100px'; // Example position
    }
}


// Docsify plugin registration
$docsify.plugins = [].concat($docsify.plugins, function (hook, vm) {
    hook.init(function () {
        setThemeBasics();
        applyCurrentThemeStyle($docsify.themeLiawn.basicsStyle.defaultTheme);
    });

    hook.mounted(function () {
        customizeHeader();
        customizeSidebar();
        setupContentArea();
        initializeFloatingToc();
    });

    hook.doneEach(function () {
        switchTheme();
    });

    // Additional plugin code...
    hook.beforeEach(function(content) {
        // Logic to execute before processing each markdown file
        // For example, adding a custom header or footer
        return content;
    });

    hook.afterEach(function(html, next) {
        // Logic to execute after processing each markdown file
        // For example, manipulating the generated HTML
        next(html);
    });

    // Event listeners or other interactions
    window.addEventListener('resize', function() {
        // Logic to handle window resize
    });

    // Other utility functions or plugin integrations
    function additionalUtilityFunction() {
        // Utility function logic
    }
});
