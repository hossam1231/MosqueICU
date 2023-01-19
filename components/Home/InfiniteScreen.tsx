var React = require("react-native");

var { StyleSheet, View, Image, ListView } = React;

var data = [
  {
    id: 1,
    profile_picture: {
      href: "//like1.r.worldssl.net/ui_big/1305634.jpg",
    },
  },
  {
    id: 2,
    profile_picture: {
      href: "//like1.r.worldssl.net/ui_big/1305634.jpg",
    },
  },
  {
    id: 3,
    profile_picture: {
      href: "//like1.r.worldssl.net/ui_big/1305634.jpg",
    },
  },
  {
    id: 4,
    profile_picture: {
      href: "//like1.r.worldssl.net/ui_big/1305634.jpg",
    },
  },
  {
    id: 5,
    profile_picture: {
      href: "//like1.r.worldssl.net/ui_big/1305634.jpg",
    },
  },
  {
    id: 6,
    profile_picture: {
      href: "//like1.r.worldssl.net/ui_big/1305634.jpg",
    },
  },
];

export var InfiniteScreen = React.createClass({
  getInitialState: function () {
    return {
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },
  componentDidMount: function () {
    this.setState({
      dataSource: this.getDataSource(data),
    });
  },
  renderRow: function (item) {
    return (
      <View>
        <Image
          style={{ width: 80, height: 80 }}
          source={{ uri: "http:" + item.profile_picture.href }}
        />
      </View>
    );
  },
  onEndReached: function () {
    console.log("onEndReached", this.state.isLoadingTail);
    if (this.state.isLoadingTail) {
      // We're already fetching
      return;
    }
    this.setState({
      isLoadingTail: true,
    });

    this.setState({
      isLoadingTail: false,
      dataSource: this.getDataSource(data),
    });
  },
  getDataSource: function (users): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(users);
  },
  render: function () {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  },
});
