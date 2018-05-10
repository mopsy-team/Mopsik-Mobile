import React, {Component} from 'react';
import {DeviceEventEmitter, FlatList, View} from 'react-native';

import Swipeout from 'react-native-swipeout';

import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';
import Header from 'mopsik_mobile/src/components/tools/Header';

export default class FavouritesView extends Component {

  constructor() {
    super();
    this.state = {
      favouriteMOPsMapped: [],
    };
  }

  componentDidMount = () => {
    this.setState({favouriteMOPsMapped: MOPS.favouriteMOPsMapped});
  };

  componentWillMount() {
    /* this listener makes sure that after deleting mop from favourites in details view,
      mop disappears from favourites view */
    DeviceEventEmitter.addListener('refresh', () => {
      if (this.refs.favs) {
        this.setState({favouriteMOPsMapped: MOPS.favouriteMOPsMapped});
      }
    });
    /* download usages from API */
    MOPS.refresh();
  }

  deleteFav = (id) => {
    FAVOURITES.deleteFavourite(id);
    this.setState({favouriteMOPsMapped: MOPS.favouriteMOPsMapped});
  };

  /* buttons appearing when swiping left elements on favourites list */
  swipeBtns = (id) => {
    return [{
      text: 'Usuń',
      backgroundColor: THEMES.basic.Red,
      underlayColor: THEMES.basic.underlayWhite,
      onPress: () => {
        this.deleteFav(id)
      }
    }];
  };

  reload = () => {
    this.setState({reload: true});
  };

  render() {
    let {main_vehicle} = SETTINGS.settings;

    return (

      <View ref='favs'>
        <Header navigation={this.props.navigation} title='Ulubione MOPy' reload={this.reload}/>
        <FlatList
          data={this.state.favouriteMOPsMapped}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Swipeout right={this.swipeBtns(item.id)}
                      autoClose
                      backgroundColor='transparent'
                      key={index}>
              <MopListItem mop={item} navigation={this.props.navigation}/>
            </Swipeout>)}
          style={{backgroundColor: THEMES.basic.White, marginBottom: 100}}
        />
      </View>
    );
  }
}
