import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        LoadedComponent: null,
      };
    }

    async componentDidMount() {
      const { default: LoadedComponent } = await importComponent();

      this.setState({ LoadedComponent });
    }

    render() {
      const { LoadedComponent } = this.state;

      return LoadedComponent ? <LoadedComponent {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
