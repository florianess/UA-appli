import React from 'react'
import { Card, Popover, Steps, Spin, Button, Modal, Input } from 'antd'
import { connect } from 'react-redux'
import { setSpotlightState } from '../../../../modules/spotlights'
import { fetchInfos } from '../../../../modules/infos'
import { addState } from '../../../../modules/spotlights'

const Step = Steps.Step

class TournamentStatusBar extends React.Component {
  constructor(props) {
    super(props)

    props.getInfos(props.game, 0, 1)
    
    const spotlight = props.spotlights.find(s => `${s.id}` === props.game)

    this.state = {
      etat: spotlight ? spotlight.state : 0,
      info: props.infos && props.infos.length > 0 ? props.infos[0].title : '',
      modalVisible: false,
      title: '',
      description: '',
      popup: '',
    }
  }

  static getDerivedStateFromProps (props, state) {
    const spotlight = props.spotlights.find(s => `${s.id}` === props.game)
    return {
      ...state,
      etat: spotlight ? spotlight.state : 0,
      info: props.infos && props.infos.length > 0 ? props.infos[0].title : ''
    }
  }

  openModal = () => {
    this.setState({ modalVisible: true })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  addState = () => {
    const { title, description, popup } = this.state
    this.props.addState(this.props.game, title, description, popup)
    this.setState({
      modalVisible: false,
      title: '',
      description: '',
      popup: '',
    })
  }

  customDot = (dot, { index }) => {
    const { game, spotlights } = this.props
    const spotlight = spotlights.find(s => `${s.id}` === game)
    return (
    <Popover content={<span>{spotlight.states[index].popover}</span>}>
      {dot}
    </Popover>
  )}

  nextState = () => {
    const spotlight = this.props.spotlights.find(s => `${s.id}` === this.props.game)
    let etat = this.state.etat + 1
    etat = etat > spotlight.states.length - 1 ? spotlight.states.length - 1 : etat
    this.props.setSpotlightState(spotlight.id, etat)
    this.setState({ etat })
  }

  previousState = () => {
    const spotlight = this.props.spotlights.find(s => `${s.id}` === this.props.game)
    let etat = this.state.etat - 1
    etat = etat >= 0 ? etat : 0
    this.props.setSpotlightState(spotlight.id, etat)
    this.setState({ etat })
  }

  render() {
    const { game } = this.props
    let spotlight = this.props.spotlights.find(s => `${s.id}` === game)
    if(!spotlight) return <Spin/>

    return (
      <div>
        <Modal
          title="Ajout d'un état"
          visible={this.state.modalVisible}
          onOk={() => this.addState()}
          onCancel={this.closeModal}
        >
          <Input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Titre"
          />
          <Input
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="Description"
          />
          <Input
            value={this.state.popup}
            onChange={e => this.setState({ popup: e.target.value })}
            placeholder="Popup"
          />
        </Modal>
        <Card title={<h1>{spotlight.name}</h1>}>
          <Steps current={this.state.etat} progressDot={this.customDot}>
          {
            spotlight.states && spotlight.states.map(state => (
              <Step
              title={state.title}
              description={state.desc}
              key={state.id}
            />))
          }
          </Steps>
        </Card>
        {this.props.user && this.props.user.isAdmin === 100 &&
          <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-around' }}>
            <Button type="danger" onClick={this.previousState}>État précédent</Button>
            <Button type="primary" onClick={this.openModal}>Ajouter un état</Button>
            <Button type="primary" onClick={this.nextState}>État suivant</Button>
          </div>
        }
        {!this.props.noLastInfo ? <Card>Dernière info : {this.state.info}</Card> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spotlights: state.spotlights.spotlights,
  user: state.user.user,
  infos: state.infos.infos,
})

const mapDispatchToProps = dispatch => ({
  setSpotlightState: (spotlightId, stateValue) => dispatch(setSpotlightState(spotlightId, stateValue)),
  getInfos: (spotlight, start, end) => dispatch(fetchInfos(spotlight, start, end)),
  addState: (spotlightId, title, desc, popup) => dispatch(addState(spotlightId, title, desc, popup)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TournamentStatusBar)
