import React from 'react';
import { AutoComplete, Collapse } from 'antd';
import HsDecksUserUICard from './HsDecksUserUICard';
const Panel = Collapse.Panel;

const db = [
  {
    username: 'Flo',
    decks: {
      1: 'AAEBAR8GgAfFCKirAoW4AunSAobTAgyNAagCtQPJBJcI2wn+DPixAt3SAt/SAuPSAuHjAgA=',
      2: 'AAEBAa0GBqIJpQmoqwKFuALCzgKQ0wIM0wrXCqGsAre7Aui/Auq/AtHBAuXMAubMArTOAujQAuPpAgA=',
      3: 'AAEBAf0GBMrDAsLOApfTApziAg0w9wTyBc4Hwgi0rAK8tgKXwQKfwgLrwgKbywL3zQLy0AIA',
      4: 'AAEBAa0GAtYKqrICDvgC5QSNCNEK8gyCtQK1uwK6uwLwuwLRwQLYwQLOzALL5gL86gIA',
      5: 'AAEBAf0GBsQIzAjgrAKgzgKX0wLY5wIMigHbBrYHm8IC3sQC58sCrs0C8tAC+NACiNIC/OUC6OcCAA=='
    }
  },
  {
    username: 'Toto',
    decks: {
      1: 'AAEBAf0GBOCsApfTAp3iAtvpAg2KAZME9wS2B+EH3sQC58sC8tAC+NACiNICi+EC/OUC6OcCAA==',
      2: 'AAEBAZ8FBPIFrwe5wQLW5QINxQPbA6cFpwixCNOqAtmuAtO8ArPBAp3CArHCAuPLAvjSAgA=',
      3: 'AAEBAZ8FBvQFucECg8cC1uUCteYCt+cCDKcF9QXZB7EI2a4Cu68C/68CuMcC2ccC48sC+NICieYCAA==',
      4: 'AAEBAf0EBsABqwS/CKO2Atm7AqLTAgxxuwKVA+YElgXsBde2Auu6Aoe9AsHBApjEAo/TAgA=',
      5: 'AAEBAa0GAuG/AtDnAg4IjQjyDIK1Arq7AvC7AtnBAsrDApnIAsrLAs7MAsvmAvzqAtfrAgA='
    }
  }
];

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};

class HsDecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: db.map(user => {
        return user.username;
      })
    };
  }

  handleSearch = value => {
    this.setState({
      dataSource: !value ? [] : [value, value + value, value + value + value]
    });
  };

  handleChoice = (value, option) => {
    console.log(value, option);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <h1>Decks Hearthstone</h1>
        <p>Rechercher un deck par nom de joueur</p>
        <AutoComplete
          dataSource={dataSource}
          style={{
            width: '200px'
          }}
          onSelect={this.handleChoice}
          onSearch={this.handleSearch}
          placeholder="input here"
        />
        <Collapse accordion>
          {db.map((user, key) => {
            return (
              <Panel header={user.username} key={key}>
                <HsDecksUserUICard decks={user.decks} />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}

export default HsDecks;
