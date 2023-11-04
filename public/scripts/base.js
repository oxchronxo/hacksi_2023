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
window.init = async () => {
    console.log(loadTag, 'init');
    // perform page initialization tasks
    // restore saved stuff from local storage
    const pageState = window.getPageState?.();
    console.log(loadTag, 'pageState', pageState);

};
// this gets executed just before the page unloads
window.destroy = async () => {
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
    console.log(loadTag, 'someGlobalMethod');
};

/*---------------------------------------------------------------------------*/

// retrieve settings from local storage
window.getPageState = () => {
    const pageState = sessionStorage.getItem(pageStateStorageName);
    // ternary statement
    return pageState ? JSON.parse(pageState) : {};
};
// record settings in local storage
// default to empty Object literal
window.setPageState = (pageState={}) => {
    sessionStorage.setItem(pageStateStorageName, JSON.stringify(pageState));
};

/*---------------------------------------------------------------------------*/

/**
 * When page loads
 */
window.addEventListener('DOMContentLoaded', () => window.init?.());

/**
 * When page unloads
 * We want to save the state of the page
 */
window.addEventListener('beforeunload', () => window.destroy?.());
