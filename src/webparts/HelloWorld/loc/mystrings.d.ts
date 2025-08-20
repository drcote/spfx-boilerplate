declare interface IHelloWorldWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
}

declare module 'HelloWorldWebPartStrings' {
  const strings: HelloWorldWebPartStrings;
  export = strings;
}
