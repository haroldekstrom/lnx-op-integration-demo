import React, { Component } from "react"
import FileSaver from "file-saver"
import qs from "qs"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

// Bookmark and link work with applications.pkt

const defaultBookmark = `<?xml version="1.0" encoding="utf-8"?>
<bookmark version="1" name="Cross Launch with Bookmark">
  <host>192.168.10.5</host>
  <port>6367</port>
  <starttime>2014-09-24T15:06:19.000000000Z</starttime>
  <endtime>2014-09-24T15:08:16.000000000Z</endtime>
  <filter>addr(type: ip, addr1: '192.168.10.10', addr2: '208.185.55.67') &amp; port(port1: 50599, port2: 80)</filter>
  <showdialog>1</showdialog>
  <capturesessionid>-1</capturesessionid>
</bookmark>
`

const defaultLink =
  "http://192.168.10.5/omnipeek/forensics/?name=Cross Launch with Link&startTime=2014-09-24T15:06:19Z&endTime=2014-09-24T15:08:16Z&filter=addr(type: ip, addr1: '192.168.10.10', addr2: '208.185.55.67') %26 port(port1: 50599, port2: 80)&showDialog=1"

class App extends Component {
  state = {
    bookmark: defaultBookmark,
    link: defaultLink,
  }

  onBookmark = event => {
    event.preventDefault()
    FileSaver.saveAs(
      new Blob([this.state.bookmark], { type: "text/plain;charset=utf8" }),
      "Omnipeek.pkb"
    )
  }

  onChangeBookmark = event => {
    this.setState({ bookmark: event.target.value })
  }

  onChangeLink = event => {
    const link = event.target.value
    this.setState({ link })
  }

  render() {
    const linkParts = this.state.link.split("?")
    const params = qs.parse(linkParts[1])
    return (
      <main>
        <div>
          <section>
            <h1>Omnipeek Desktop (Bookmark)</h1>
            <a href="http://localhost" onClick={this.onBookmark}>
              Cross Launch with Bookmark
            </a>
            <h2>Bookmark</h2>
            <textarea
              className="box text-monospace"
              value={this.state.bookmark}
              onChange={this.onChangeBookmark}
              style={{ minHeight: "18rem" }}
              spellCheck="false"
            />
          </section>
          <section>
            <div>
              <h1>Omnipeek Web (Link)</h1>
              <a href={this.state.link} target="_blank" rel="noopener noreferrer">
                Cross Launch with Link
              </a>
              <h2>Link</h2>
              <textarea
                className="box text-monospace"
                value={this.state.link}
                onChange={this.onChangeLink}
                style={{ minHeight: "7rem" }}
                spellCheck="false"
              />
              <h2>Params</h2>
              <pre className="box">
                {Object.keys(params).map(field => `${field}=${params[field]}\n`)}
              </pre>
            </div>
          </section>
        </div>
      </main>
    )
  }
}

export default App
