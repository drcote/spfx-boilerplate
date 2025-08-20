import {useEffect, useState} from "react";
import {HelloWorld} from "../../webparts/HelloWorld/components";
import {IHelloWorldWebPartProps} from "../../webparts/HelloWorld/HelloWorldWebPart";

const getConfigUrlFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('configUrl') || './config.json'
}

function debounce(fn: () => void, delay: number) {
    let timeout: number;
    return () => {
        clearTimeout(timeout);
        timeout = window.setTimeout(fn, delay);
    };
}

function App() {
    const [config, setConfig] = useState<IHelloWorldWebPartProps>(null);
    const configUrl = getConfigUrlFromQuery();
    console.log('configUrl: ' + configUrl);

    useEffect(() => {
        fetch(configUrl, {cache: 'no-cache'})
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error('Ошибка загрузки конфигурации:', err));
    }, [configUrl])

// отправка изменения высоты элемента
    useEffect(() => {
        const sendHeight = () => {
            //const body = document.body;
            const html = document.documentElement;

            const height = Math.max(
                // body.scrollHeight,
                // body.offsetHeight,
                // html.clientHeight,
                // html.scrollHeight,
                html.offsetHeight
            );
            window.parent.postMessage({type: 'resize', height}, '*');
        }
        const debouncedSendHeight = debounce(sendHeight, 2);

        sendHeight();

        const observer = new ResizeObserver(debouncedSendHeight);
        observer.observe(document.body);
        return () => {
            observer.disconnect()
        }
    }, [])

    if (!config) return <>Настройки не доступны</>
    if (config) return <HelloWorld {...config}/>


}

export default App
