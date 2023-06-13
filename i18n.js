var i18n = require('i18n');

i18n.configure({
    locales: ['en', 'fr'], // Add more locales as needed
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'lang', // Set the cookie name to store the selected language
    autoReload: true,
});

module.exports = function(req, res, next) {
    i18n.init(req, res);
    i18n.getLocale();
    return next();
};
