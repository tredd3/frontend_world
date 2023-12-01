'use strict'
import React, { Component } from 'react'
import Mic from "@material-ui/icons/Mic";
import { throttle } from "lodash";

// -----------------SPEECH RECOGNITION SETUP---------------------

const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-IN'

// ------------------------COMPONENT-----------------------------

class Speech extends Component {
  constructor() {
    super()
    this.state = {
      listening: false
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.handleOnClick = throttle(this.handleOnClick, 500).bind(this);
  }

  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    )
  }

  handleListen() {
    console.log(this.state.listening)
    if (this.state.listening) {
      if (recognition.onstart) {
        console.log("Already started");
      }
      else {
        recognition.start();
      }

      let finalTranscript = ''
      recognition.onresult = event => {
        let interimTranscript = ''
        if (event.results[0].isFinal) {
          let i = event.resultIndex;
          finalTranscript = event.results[i][0].transcript
        }
        this.props.getInputSTT(finalTranscript);
      }
      recognition.onend = () => {
        console.log('Stopping Speech')
      }
    } else {
      this.setState({
        listening: !this.state.listening
      }, (e) => { recognition.stop() })
    }

    // handle speech recognition here
  }
  componentWillUnmount() {
    recognition.abort();
  }

  handleOnClick = () => {
    this.setState({
      listening: true
    }, () => { this.handleListen() })

    // this.toggleListen();
  }

  render() {
    return (
      <span>
        <Mic style={this.props.style} onClick={this.handleOnClick} />
      </span>
    )
  }
}

export default Speech

// -------------------------CSS------------------------------------

