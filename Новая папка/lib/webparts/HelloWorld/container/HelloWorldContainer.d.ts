import * as React from 'react';
export interface IHelloWorldContainerProps {
    SettingsRootCollection: string;
    SettingsList: string;
}
export default class HelloWorldContainer extends React.Component<IHelloWorldContainerProps, {}> {
    render(): React.ReactElement<IHelloWorldContainerProps>;
}
