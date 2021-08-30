import React, { PureComponent, createRef, Component } from 'react'
interface IProps {
  name: string;
  id: number;
  son2?: React.ReactChild;
  son: () => React.ReactElement;
}
interface IStates {
  count: number
  text: string
}

export default class Child extends PureComponent<IProps, IStates>{
  public myRef
  constructor (props: IProps) {
    super(props)
    this.myRef = createRef<HTMLInputElement>()
    this.state = {
      count: 1,
      text: 'hello'
    } as IStates
  }
  // state: IStates = {
  //   count: 1,
  //   text: 'hello'
  // }
  btnClick = () => {
    console.log('111', 111)
  }

  get computedValue () {
    return this.state.text
  }
  componentDidMount() {
      setTimeout(() => {
          this.setState({
              text: 'hello react change'
          })
          console.log('this.myRef', this.myRef.current)
      }, 2000)
  }

  render() {
    console.log('chidl---->')
    return (
      <div>
        {this.props.son()}
        {this.props.son2}
        <h1 ref={this.myRef}>{this.state.text}</h1>
        child
        {this.props.name}---{this.props.id}
        <button onClick={this.btnClick}>btn</button>
      </div>
    )
  }
}
