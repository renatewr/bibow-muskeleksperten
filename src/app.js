'use strict';

require('./app.less');

var OfflinePlugin = require('offline-plugin/runtime');

OfflinePlugin.install({
    onUpdateReady: function() {
        OfflinePlugin.applyUpdate();
    },
    onUpdated: function() {
        window.location.reload();
    }
});