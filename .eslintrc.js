module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2016
    },
    extends: [
        "eslint:recommended"
    ],
    env: {
        jest: true,
        browser: true,
        node: true
    },
    rules: {
        "no-unused-vars": "off",
        "no-empty-function": "off",
        "no-var-requires": "off",
        "no-empty-interface": "off",
        "no-explicit-any": "off",
        "ban-ts-comment": "off",
        "no-inferrable-types": "off",
        "valid-typeof": "off"
    }
};
