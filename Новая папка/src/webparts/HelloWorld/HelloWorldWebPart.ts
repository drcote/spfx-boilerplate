import "reflect-metadata";
import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';

import { configContainer } from '../../common';
import { loadTheme } from "@fluentui/react";
import {HelloWorld} from "./components";

export interface IHelloWorldWebPartProps {
  
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  
  constructor() {
    super();
    loadTheme({effects:{roundedCorner2: '0px'}})
  }
  
  public render(): void {
    configContainer();
    const element: React.ReactElement<IHelloWorldWebPartProps> =
      React.createElement(HelloWorld, {...this.properties});

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: []
            }
          ]
        }
      ]
    };
  }
}
