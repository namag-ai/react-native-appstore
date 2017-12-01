import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import collectionsWithProps from 'graphql/queries/collections';
import Collection from './components/collection';

@collectionsWithProps
export default class Games extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    data: PropTypes.object,
    type: PropTypes.string,
  }

  static defaultProps = {
    navigator: undefined,
    data: undefined,
    type: undefined,
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    drawUnderTabBar: true,
    prefersLargeTitles: true,
    navBarBackgroundColor: 'white',
  }

  keyExtractor(item) {
    return item.key;
  }

  @autobind
  renderItem({ item }) {
    return item;
  }

  render() {
    const {
      error,
      allCollections = [],
    } = this.props.data;

    if (error) {
      console.log('Error while fetching data %o', error);
    }

    return (
      <FlatList
        style={styles.host}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        data={[
          ...allCollections.map(collection => (
            <Collection
              showAction
              key={collection.id}
              type={this.props.type}
              navigator={this.props.navigator}
              collection={collection}
            />
          )),
          <View key="gutter" style={styles.gutter} />,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 18,
    paddingTop: 0,
  },

  gutter: {
    height: 40,
    backgroundColor: 'white',
    marginTop: -2,
  },
});
