import orderBy from 'lodash/orderBy';
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React from 'react';

import SearchContact from '../components-Contacts/SearchContact';
import Headers from '../components-Home/Header';

class TransferDial extends React.Component {
  render() {
    const p = this.props;
    const users = p.matchIds.map(p.resolveMatch);

    const map = {};
    users.forEach(u => {
      u.name = u.name || u.id;
      let c0 = u.name.charAt(0).toUpperCase();
      if (!/[A-Z]/.test(c0)) {
        c0 = '#';
      }
      if (!map[c0]) {
        map[c0] = [];
      }
      map[c0].push(u);
    });

    let groups = Object.keys(map).map(k => ({
      key: k,
      users: map[k],
    }));

    groups = orderBy(groups, 'key');
    groups.forEach(g => {
      g.users = orderBy(g.users, 'name');
    });

    return (
      <Container>
        <React.Fragment>
          <Headers title="Transfer call" />
          <SearchContact />
          <Content>
            {groups.map(g => (
              <React.Fragment key={g.key}>
                <ListItem itemDivider>
                  <Text>{g.key}</Text>
                </ListItem>
                {g.users.map(u => (
                  <ListItem key={u.id} listUser>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: u.avatar,
                        }}
                      />
                    </Left>
                    <Body>
                      <Text>{u.name}</Text>
                      <Text note>{u.id}</Text>
                    </Body>
                    <Right>
                      <Button onPress={() => p.transferAttended(u.number)}>
                        <Icon type="MaterialIcons" name="phone-forwarded" />
                      </Button>
                      <Button onPress={() => p.transferBlind(u.number)}>
                        <Icon type="MaterialIcons" name="call" />
                      </Button>
                    </Right>
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </Content>
        </React.Fragment>
      </Container>
    );
  }
}

export default TransferDial;
