var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { HelloWorld } from "../../webparts/HelloWorld/components";
var getConfigUrlFromQuery = function () {
    var params = new URLSearchParams(window.location.search);
    return params.get('configUrl') || './config.json';
};
function debounce(fn, delay) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = window.setTimeout(fn, delay);
    };
}
function App() {
    var _a = useState(null), config = _a[0], setConfig = _a[1];
    var configUrl = getConfigUrlFromQuery();
    console.log('configUrl: ' + configUrl);
    useEffect(function () {
        fetch(configUrl, { cache: 'no-cache' })
            .then(function (res) { return res.json(); })
            .then(function (data) { return setConfig(data); })
            .catch(function (err) { return console.error('Ошибка загрузки конфигурации:', err); });
    }, [configUrl]);
    // отправка изменения высоты элемента
    useEffect(function () {
        var sendHeight = function () {
            //const body = document.body;
            var html = document.documentElement;
            var height = Math.max(
            // body.scrollHeight,
            // body.offsetHeight,
            // html.clientHeight,
            // html.scrollHeight,
            html.offsetHeight);
            window.parent.postMessage({ type: 'resize', height: height }, '*');
        };
        var debouncedSendHeight = debounce(sendHeight, 2);
        sendHeight();
        var observer = new ResizeObserver(debouncedSendHeight);
        observer.observe(document.body);
        return function () {
            observer.disconnect();
        };
    }, []);
    if (!config)
        return _jsx(_Fragment, { children: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B" }, void 0);
    if (config)
        return _jsx(HelloWorld, __assign({}, config), void 0);
}
export default App;

//# sourceMappingURL=App.js.map
