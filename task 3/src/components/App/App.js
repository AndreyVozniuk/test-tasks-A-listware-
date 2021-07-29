import React from 'react'
import { data } from '../../data'
import File from '../File'
import Folder from '../Folder'
import { filterExpandedFolders, findFile } from '../../helper'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filename: '',
      expandedFolders: []
    }
  }

  handleChange = (e) => {
    this.setState({
      filename: e.target.value
    })
  }

  searchFile = () => {
    const foundPaths = findFile(data, this.state.filename)

    if(foundPaths[0]) {
      this.setState({
        expandedFolders: [
          foundPaths[0]
        ]
      })
    }
  }

  resetExpandedFolders = () => {
    this.setState({
      expandedFolders: []
    })
  }

  render() {
    const { expandedFolders } = this.state

    return (
      <div className={'app'}>


        <div className={'listOfFoldersAndFiles'}>
          <h2>Folders & Files</h2>

          <div style={{marginLeft: '10px'}}>
            <input onChange={this.handleChange}/>
            <button onClick={this.searchFile} style={{marginLeft: '10px'}}>Search</button>
          </div>

          <div>
            {
              data.map(item => {
                if(item.type === 'FOLDER') {
                  return <Folder
                    key={item.name}
                    name={item.name}
                    items={item.children}
                    expandedFolders={filterExpandedFolders(expandedFolders, data)}
                    resetExpandedFolders={this.resetExpandedFolders}
                    deepLength={1}
                    potentialShow={true}
                  />
                }

                if(item.type === 'FILE') {
                  return <File key={item.name} name={item.name} mime={item.mime} />
                }

                return ''
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
