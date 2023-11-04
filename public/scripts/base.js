/**
 * 
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

const init = async () => {
    console.log('HACKSI', 'init');
    // perform page initialization tasks

};

// local storage key name
const pageStateStorageName = 'hacksi';

// retrieve settings from local storage
const getPageState = () => {
    return JSON.parse(sessionStorage.getItem(pageStateStorageName));
};
// record settings in local storage
const setPageState = (pageState={}) => {
    sessionStorage.setItem(pageStateStorageName, JSON.stringify(pageState));
};

/**
 * @event DOMContentLoaded
 */
window.addEventListener('DOMContentLoaded', async (event) => {
    init();

    // restore saved stuff from local storage
    const pageState = getPageState();
    // verify pageState has properties to work with
    if (Object.keys(pageState).length !== 0) {
        // operate on pageState

    }

});

/**
 * @event onBeforeUnload
 */
window.addEventListener('onBeforeUnload', async (event) => {
    // construct page state object
    const pageState = {};
    // save stuff in local storage for later
    setPageState(pageState);
});
