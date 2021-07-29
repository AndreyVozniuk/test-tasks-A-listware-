import React from 'react'
import File from './File'
import { checkOnCollapseByDefault } from '../helper'

const btnStyle = {
  marginLeft: '10px',
  height: '25px'
}
const folderWrapperStyle = {
  margin: '20px',
  display: 'flex',
  flexDirection: 'column'
}

class Folder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapse: null
    }
  }

  show = () => {
    this.setState({isCollapse: false})
    this.props.resetExpandedFolders()
  }

  collapse = () => {
    this.setState({isCollapse: true})
  }

  render() {
    const { name, items, expandedFolders, deepLength, potentialCollapse } = this.props
    const { isCollapse } = this.state

    const isCollapseByDefault = isCollapse === null ? checkOnCollapseByDefault(this.props.expandedFolders, this.props.name) : isCollapse
    return <div style={folderWrapperStyle}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        { name }
        <svg style={{marginLeft: '10px'}} height="15px" viewBox="0 -57 512.00003 512" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m506.039062 180.492188c-7.773437-12.554688-21.523437-20.046876-36.78125-20.046876h-38.085937v-69.863281c0-16.863281-14.226563-30.578125-31.710937-30.578125h-186.441407c-.273437 0-.457031-.078125-.53125-.125l-33.367187-46.667968c-5.917969-8.273438-15.675782-13.210938-26.105469-13.210938h-121.304687c-17.488282 0-31.710938 13.71875-31.710938 30.578125v335.148437c0 17.257813 14.570312 31.300782 32.484375 31.300782h377.363281c5.878906 0 10.957032-3.394532 13.414063-8.320313l.011719.003907 84.5625-169.839844c6.132812-12.308594 5.457031-26.65625-1.796876-38.378906zm-474.328124-150.492188h121.304687c.898437 0 1.507813.394531 1.699219.664062l33.417968 46.734376c5.640626 7.890624 14.945313 12.605468 24.886719 12.605468h186.441407c1.046874 0 1.578124.492188 1.710937.667969v69.773437h-271.472656c-16.835938 0-32.148438 9.488282-39.011719 24.175782l-60.6875 129.871094v-283.824219c.132812-.175781.664062-.667969 1.710938-.667969zm449.269531 175.5-80.421875 161.523438h-361.992188l79.300782-169.699219c1.921874-4.113281 6.679687-6.878907 11.832031-6.878907h339.558593c4.792969 0 9.007813 2.183594 11.273438 5.839844 1.273438 2.058594 2.382812 5.328125.449219 9.214844zm0 0"/></svg>
        {
          isCollapseByDefault ? <button onClick={this.show} style={btnStyle}>Show</button> :
          <button onClick={this.collapse} style={btnStyle}>Collapse</button>
        }
      </div>

      {
        !isCollapseByDefault &&
        <div>
          {
            items.map(item => {
              if(item.type === 'FOLDER') {
                return <Folder
                  key={item.name}
                  name={item.name}
                  items={item.children}
                  expandedFolders={expandedFolders}
                  resetExpandedFolders={this.props.resetExpandedFolders}
                  deepLength={deepLength + 1}
                  potentialShow={potentialCollapse}
                />
              }

              if(item.type === 'FILE') {
                return <File key={item.name} name={item.name} mime={item.mime} />
              }

              return ''
            })
          }
        </div>
      }
    </div>
  }
}

export default Folder
