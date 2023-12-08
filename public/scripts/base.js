/**
 * base
 */
window.utilities = {

    loadScript: function (src) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
};

// local storage key name
const pageStateStorageName = 'hacksi';
// prefix shown in log messages
const loadTag = '[HSI]';

// this gets executed when the page loads
// but it doesn't wait for all the resources to load
window.init = () => {
    console.log(loadTag, 'init');
    // perform page initialization tasks
    // restore saved stuff from local storage
    const pageState = window.getPageState();
    console.log(loadTag, 'pageState', pageState);
    const pageData = window.getPageData();
    console.log(loadTag, 'pageData', pageData);
};
// this gets executed just before the page unloads
window.destroy = () => {
    console.log(loadTag, 'destroy');
    // perform page destruction tasks
    // construct page state object
    // stuff we want to remember next time we load the page
    const pageState = {
        name: 'HackSI',
        project: 'main'
    };
    // save stuff in local storage for later
    window.setPageState?.(pageState);
};

/*---------------------------------------------------------------------------*/

// this is called by the button on the page
window.someGlobalMethod = () => {
    console.log(loadTag, 'someGlobalMethod kjasdhfksadjfh');
};

/*---------------------------------------------------------------------------*/
// retrieve page config from dom attribute
window.getPageData = () => {
    return JSON.parse(document.getElementById('pageData').getAttribute('data'));
};
// record page config to dom attribute
window.setPageData = (pageData={}) => {
    document.getElementById('pageData').setAttribute('data', JSON.stringify(pageData));
};
// retrieve settings from local storage
window.getPageState = () => {
    const pageState = sessionStorage.getItem(pageStateStorageName);
    // ternary statement
    return pageState ? JSON.parse(pageState) : {};
};
// record settings in local storage
window.setPageState = (pageState={}) => {
    sessionStorage.setItem(pageStateStorageName, JSON.stringify(pageState));
};

/*---------------------------------------------------------------------------*/

/**
 * When page loads
 */
// window.addEventListener('DOMContentLoaded', () => window.init?.());
window.addEventListener('load', () => window.init?.());

/**
 * When page unloads
 * We want to save the state of the page
 */
// window.addEventListener('beforeunload', () => window.destroy?.());
window.addEventListener('unload', () => window.destroy?.());
